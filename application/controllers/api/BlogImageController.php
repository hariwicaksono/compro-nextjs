<?php

use Restserver\Libraries\REST_Controller;

defined('BASEPATH') or exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';
class BlogImageController extends REST_Controller
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

	public function index_put()
	{
		$id = $this->put('id');
		$data = [
			'post_image' => $this->put('foto'),
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
