<?php

use Restserver\Libraries\REST_Controller;

defined('BASEPATH') or exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';

class ImageUpload extends REST_Controller
{
	public function __construct($config = 'rest')
	{
		parent::__construct($config);
		$this->load->model('MasterModel', 'Model');
		header('Access-Control-Allow-Origin: *');
		header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
		header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
		$method = $_SERVER['REQUEST_METHOD'];
		if ($method == "OPTIONS") {
			die();
		}
	}

	public function index_post()
	{
		$gambar = $_FILES['foto']['name'];
		if ($gambar == "") {
			$this->response([
				'status' => false,
				'message' => 'Gagal upload file',
				'data' => []
			], REST_Controller::HTTP_OK);
		} else {
			$config['allowed_types'] = "jpeg|jpg|png|gif";
			$config['upload_path'] = "uploads/images";
			$config['overwrite'] = TRUE;
			$config['max_size']       = '20000';
			$config['max_width']      = '20000';
			$config['max_height']     = '20000';
			$config['remove_spaces']  = false;
			$this->load->library('upload', $config);
			$this->upload->initialize($config);
			if ($this->upload->do_upload('foto')) {
				$gbr = $this->upload->data();
				//Compress Image
				$config['image_library'] = 'gd2';
				$config['source_image'] = 'uploads/images/' . $gbr['file_name'];
				$config['create_thumb'] = FALSE;
				$config['maintain_ratio'] = FALSE;
				$config['quality'] = '95%';
				$config['width'] = 1200;
				$config['height'] = 800;
				$config['new_image'] = 'uploads/images/' . $gbr['file_name'];
				$this->load->library('image_lib', $config);
				$this->image_lib->resize();
				$this->response([
					'status' => true,
					'message' => 'Gambar berhasil diupload',
					'data' => []
				], REST_Controller::HTTP_OK);
			} else {
				$this->response([
					'status' => false,
					'message' => $this->upload->display_errors(),
					'data' => []
				], REST_Controller::HTTP_OK);
			}
		}
	}
}
