<?php

use Restserver\Libraries\REST_Controller;

defined('BASEPATH') or exit('No direct script access allowed');


require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';

class LoginController extends REST_Controller
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

	private function _validasi()
	{
		$this->form_validation->set_data($this->post());
		$this->form_validation->set_rules('email', 'Email', 'required|valid_email');
		$this->form_validation->set_rules('password', 'Password', 'required');
	}

	public function index_post()
	{
		$this->_validasi();
		if ($this->form_validation->run() == false) {
			$this->response([
				'status' => false,
				'data' => [
					'emailError' => form_error('email'),
					'passwordError' => form_error('password'),
				],
				'message' => validation_errors(),
			], REST_Controller::HTTP_OK);
		} else {
			$user = $this->post('email');
			$password = md5($this->post('password'));
				
			$cek = $this->Model->cek_login($user, $password);
			unset($cek['password']);
			$user = $cek['status_user'];

			if ($user == "User") {
				$this->response([
					'status' => true,
					'id' => '1',
					'message' => 'Login Berhasil',
					'data' => $cek
				], REST_Controller::HTTP_OK);
			} elseif ($user == "Admin") {
				$this->response([
					'status' => true,
					'id' => '2',
					'message' => 'Login Berhasil',
					'data' => $cek
				], REST_Controller::HTTP_OK);
			} else {
				$this->response([
					'status' => false,
					'message' => 'Data tidak ditemukan',
					'data' => []
				], REST_Controller::HTTP_OK);
			}
		}
	}
}
