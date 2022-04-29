<?php

use Restserver\Libraries\REST_Controller;

defined('BASEPATH') or exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';

class CategoryController extends REST_Controller
{

	public function __construct($config = 'rest')
	{
		parent::__construct($config);
		$this->load->library('form_validation');
		$this->form_validation->set_error_delimiters('', '');
		$this->load->model('MasterModel', 'Model');
		header('Access-Control-Allow-Origin: *');
		header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
		header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
		$method = $_SERVER['REQUEST_METHOD'];
		if ($method == "OPTIONS") {
			die();
		}
	}

	public function index_get()
	{
		$id = $this->get('id');
		if ($id == null) {
			$cat = $this->Model->get_category();
		} else {
			$cat = $this->Model->get_category($id);
		}

		if ($cat) {
			$this->response([
				'status' => true,
				'message' => 'Berhasil mendapatkan data',
				'data' => $cat
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
		$this->form_validation->set_rules('name', 'Nama Kategori', 'required');

		if ($this->form_validation->run() == false) {
			$this->response([
				'status' => false,
				'data' => [
					'nameError' => form_error('name'),
				],
				'message' => validation_errors(),
			], REST_Controller::HTTP_OK);
		} else {
			$data = [
				'user_id' => $this->post('user_id'),
				'name' => $this->post('name'),
				'created_at' => date("Y-m-d H:i:s")
			];

			$save = $this->Model->post_category($data);
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
		$this->form_validation->set_rules('name', 'Nama Kategori', 'required');

		if ($this->form_validation->run() == false) {
			$this->response([
				'status' => false,
				'data' => [
					'nameError' => form_error('name'),
				],
				'message' => validation_errors(),
			], REST_Controller::HTTP_OK);
		} else {
			$id = $this->put('id');
			$data = [
				'name' => $this->put('name'),
				'updated_at' => date('Y-m-d H:i:s')
			];

			$update = $this->Model->put_category($id, $data);
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
			if ($this->Model->delete_category($id)) {
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
				], REST_Controller::HTTP_NOT_FOUND);
			}
		}
	}
}
