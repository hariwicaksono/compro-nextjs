<?php

use Restserver\Libraries\REST_Controller;

defined('BASEPATH') or exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';

class ServiceController extends REST_Controller
{

	public function __construct($config = 'rest')
	{
		parent::__construct($config);
		$this->load->library('form_validation');
		$this->form_validation->set_error_delimiters('', '');
		$this->load->model('MasterModel', 'Model');
		header('Access-Control-Allow-Origin: *');
		header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
		header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT ,DELETE");
		$method = $_SERVER['REQUEST_METHOD'];
		if ($method == "OPTIONS") {
			die();
		}
	}

	public function index_get()
	{
		$id = $this->get('id');
		if ($id == null) {
			$posts = $this->Model->get_service();
		} else {
			$posts = $this->Model->get_service($id);
		}

		if ($posts) {
			$this->response([
				'status' => true,
				'message' => 'Berhasil mendapatkan data',
				'data' => $posts,
			], REST_Controller::HTTP_OK);
		} else {
			$this->response([
				'status' => false,
				'message' => 'Data tidak ditemukan',
				'data' => []
			], REST_Controller::HTTP_OK);
		}
	}

	public function index_post()
	{
		$this->form_validation->set_data($this->post());
		$this->form_validation->set_rules('title', 'Judul', 'required');
		$this->form_validation->set_rules('body', 'Isi', 'required');

		if ($this->form_validation->run() == false) {
			$this->response([
				'status' => false,
				'data' => [
					'titleError' => form_error('title'),
					'bodyError' => form_error('body'),
				],
				'message' => validation_errors(),
			], REST_Controller::HTTP_OK);
		} else {
			$title = $this->post('title');
			$data = [
				'title' => $title,
				'slug' => str_replace(' ', '-', strtolower($title)),
				'body' => $this->post('body'),
				'image' => $this->post('foto'),
				'created_at' => date("Y-m-d H:i:s")
			];

			$save = $this->Model->post_service($data);
			if ($save > 0) {
				$this->response([
					'status' => true,
					'message' => 'Berhasil menyimpan data',
					'data' => []
				], REST_Controller::HTTP_OK);
			} else {
				$this->response([
					'status' => false,
					'message' => 'Gagal menyimpan data',
					'data' => []
				], REST_Controller::HTTP_OK);
			}
		}
	}

	public function index_put()
	{
		$this->form_validation->set_data($this->put());
		$this->form_validation->set_rules('title', 'Judul', 'required');
		$this->form_validation->set_rules('body', 'Isi', 'required');

		if ($this->form_validation->run() == false) {
			$this->response([
				'status' => false,
				'data' => [
					'titleError' => form_error('title'),
					'bodyError' => form_error('body'),
				],
				'message' => validation_errors(),
			], REST_Controller::HTTP_OK);
		} else {
			$id = $this->put('id');
			$title = $this->put('title');
			$data = [
				'title' => $title,
				'slug' => str_replace(' ', '-', strtolower($title)),
				'body' => $this->put('body'),
				'updated_at' => date("Y-m-d H:i:s")
			];

			$update = $this->Model->put_service($id, $data);
			if ($update > 0) {
				$this->response([
					'status' => true,
					'message' => 'Data berhasil diperbarui',
					'data' => []
				], REST_Controller::HTTP_OK);
			} else {
				$this->response([
					'status' => 0,
					'message' => 'Tidak ada update',
					'data' => []
				], REST_Controller::HTTP_OK);
			}
		}
	}

	public function index_delete()
	{
		$id = $_GET['id'];
		if ($id == null) {
			$this->response([
				'status' => false,
				'message' => 'ID tidak ditemukan',
				'data' => []
			], REST_Controller::HTTP_OK);
		} else {
			$delete = $this->Model->delete_service($id);
			if ($delete > 0) {
				$this->response([
					'status' => true,
					'message' => 'Data berhasil dihapus',
					'data' => []
				], REST_Controller::HTTP_OK);
			} else {
				$this->response([
					'status' => false,
					'message' => 'Data gagal dihapus',
					'data' => []
				], REST_Controller::HTTP_OK);
			}
		}
	}
}
