<?php

use Restserver\Libraries\REST_Controller;

defined('BASEPATH') or exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';

class BlogController extends REST_Controller
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
		$count = $this->Model->count_blog();
		$id = $this->get('id');
		if ($id == null) {
			$posts = $this->Model->get_blog();
		} else {
			$posts = $this->Model->get_blog($id);
		}

		if ($posts) {
			$this->response([
				'status' => true,
				'message' => 'Berhasil mendapatkan data',
				'data' => $posts,
				'allCount' => $count
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
		$this->form_validation->set_rules('category_id', 'Kategori', 'required');
		$this->form_validation->set_rules('summary', 'Ringkasan', 'required');
		$this->form_validation->set_rules('body', 'Isi', 'required');
		$this->form_validation->set_rules('date', 'Tanggal', 'required');
		$this->form_validation->set_rules('time', 'Waktu', 'required');

		if ($this->form_validation->run() == false) {
			$this->response([
				'status' => false,
				'data' => [
					'titleError' => form_error('title'),
					'category_idError' => form_error('category_id'),
					'summaryError' => form_error('summary'),
					'bodyError' => form_error('body'),
					'dateError' => form_error('date'),
					'timeError' => form_error('time'),
				],
				'message' => validation_errors(),
			], REST_Controller::HTTP_OK);
		} else {
			$title = $this->post('title');
			$data = [
				'category_id' => $this->post('category_id'),
				'user_id' => $this->post('user_id'),
				'title' => $title,
				'slug' => str_replace(' ', '-', strtolower($title)),
				'summary' => $this->post('summary'),
				'body' => $this->post('body'),
				'post_image' => $this->post('foto'),
				'date' => $this->post('date'),
				'time' => $this->post('time'),
				'created_at' => date("Y-m-d H:i:s")
			];

			$save = $this->Model->post_blog($data);
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
		$this->form_validation->set_rules('summary', 'Ringkasan', 'required');
		$this->form_validation->set_rules('body', 'Isi', 'required');
		$this->form_validation->set_rules('date', 'Tanggal', 'required');
		$this->form_validation->set_rules('time', 'Waktu', 'required');

		if ($this->form_validation->run() == false) {
			$this->response([
				'status' => false,
				'data' => [
					'titleError' => form_error('title'),
					'summaryError' => form_error('summary'),
					'bodyError' => form_error('body'),
					'dateError' => form_error('date'),
					'timeError' => form_error('time'),
				],
				'message' => validation_errors(),
			], REST_Controller::HTTP_OK);
		} else {
			$id = $this->put('id');
			$title = $this->put('title');
			$data = [
				'title' => $title,
				'slug' => str_replace(' ', '-', strtolower($title)),
				'summary' => $this->put('summary'),
				'body' => $this->put('body'),
				'date' => $this->put('date'),
				'time' => $this->put('time'),
				'updated_at' => date("Y-m-d H:i:s")
			];

			$update = $this->Model->put_blog($id, $data);
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
			$delete = $this->Model->delete_blog($id);
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
