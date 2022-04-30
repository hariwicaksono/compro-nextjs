<?php

use Restserver\Libraries\REST_Controller;

defined('BASEPATH') or exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';

class CommentController extends REST_Controller
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
			$comment = $this->Model->get_comment();
		} else {
			$comment = $this->Model->get_comment($id);
		}

		if ($comment) {
			$this->response([
				'status' => true,
				'message' => 'Berhasil mendapatkan data',
				'data' => $comment,
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
		$this->form_validation->set_rules('name', 'Nama', 'required');
		$this->form_validation->set_rules('email', 'Email', 'required|valid_email');
		$this->form_validation->set_rules('body', 'Komentar', 'required');

		if ($this->form_validation->run() == false) {
			$this->response([
				'status' => false,
				'data' => [
					'nameError' => form_error('name'),
					'emailError' => form_error('email'),
					'bodyError' => form_error('body'),
				],
				'message' => validation_errors(),
			], REST_Controller::HTTP_OK);
		} else {
			$data = [
				'post_id' => $this->post('post_id'),
				'name' => $this->post('name'),
				'email' => $this->post('email'),
				'body' => $this->post('body'),
				'created_at' => date("Y-m-d H:i:s"),
				'active' => ''
			];

			$save = $this->Model->post_comment($data);
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
		$this->form_validation->set_rules('id', 'ID', 'required');

		if ($this->form_validation->run() == false) {
			$this->response([
				'status' => false,
				'data' => [
					'idError' => form_error('id'),
				],
				'message' => validation_errors(),
			], REST_Controller::HTTP_OK);
		} else {
			$id = $this->put('id');
			$data = [
				'active' => $this->put('active'),
				'updated_at' => date("Y-m-d H:i:s")
			];
			
			$update = $this->Model->put_comment($id, $data);
			if ($update > 0) {
				$this->response([
					'status' => true,
					'message' => 'Data berhasil diperbarui',
					'data' => []
				], REST_Controller::HTTP_OK);
			} else {
				$this->response([
					'status' => false,
					'message' => 'Tidak ada data yang diperbarui',
					'data' => []
				], REST_Controller::HTTP_OK);
			}
		}
	}
}
