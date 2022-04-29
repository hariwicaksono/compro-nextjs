<?php

use Restserver\Libraries\REST_Controller;

defined('BASEPATH') or exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';
class SearchController extends REST_Controller
{

	public function __construct($config = 'rest')
	{
		parent::__construct($config);
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
			$this->response([
				'status' => false,
				'message' => 'ID tidak boleh kosong',
				'data' => []
			], REST_Controller::HTTP_OK);
		} else {
			$search = $this->Model->search_blog($id);
		}

		if ($search > 0) {
			$this->response([
				'status' => true,
				'message' => 'Berhasil mendapatkan data',
				'data' => $search
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
