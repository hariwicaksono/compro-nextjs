<?php

use Restserver\Libraries\REST_Controller;

defined('BASEPATH') or exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';

class UserController extends REST_Controller
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
			$user = $this->Model->get_user();
		} else {
			$user = $this->Model->get_user($id);
		}

		if ($user) {
			$this->response([
				'status' => true,
				'message' => 'Berhasil mendapatkan data',
				'data' => $user
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
		$this->form_validation->set_rules('email', 'Email', 'required|valid_email');
		$this->form_validation->set_rules('username', 'Username', 'required');
		$this->form_validation->set_rules('password', 'Password', 'required');
		$this->form_validation->set_rules('name', 'Nama', 'required');
		$this->form_validation->set_rules('status_user', 'Status User', 'required');

		if ($this->form_validation->run() == false) {
			$this->response([
				'status' => false,
				'data' => [
					'emailError' => form_error('email'),
					'usernameError' => form_error('username'),
					'passwordError' => form_error('password'),
					'nameError' => form_error('name'),
					'status_userError' => form_error('status_user'),
				],
				'message' => validation_errors(),
			], REST_Controller::HTTP_OK);
		} else {
			$data = [
				'email' => $this->post('email'),
				'username' => $this->post('username'),
				'password' => $this->post('password'),
				'name' => $this->post('name'),
				'status_user' => $this->post('status_user'),
				'status_active' => $this->post('status_active'),
				'created_at' => date("Y-m-d H:i:s")
			];

			$save = $this->Model->post_user($data);
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
		$this->form_validation->set_rules('email', 'Email', 'required|valid_email');
		$this->form_validation->set_rules('name', 'Nama', 'required');

		if ($this->form_validation->run() == false) {
			$this->response([
				'status' => false,
				'data' => [
					'emailError' => form_error('email'),
					'nameError' => form_error('name'),
				],
				'message' => validation_errors(),
			], REST_Controller::HTTP_OK);
		} else {
			$id = $this->put('id');
			$data = [
				'email' => $this->put('email'),
				'name' => $this->put('name'),
				'updated_at' => date("Y-m-d H:i:s")
			];

			$update = $this->Model->put_user($id, $data);
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
			$delete = $this->Model->delete_user($id);
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
