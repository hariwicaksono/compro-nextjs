<?php

use Restserver\Libraries\REST_Controller;

defined('BASEPATH') or exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';
class SlideshowController extends REST_Controller
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
			$slide = $this->Model->get_slideshow();
		} else {
			$slide = $this->Model->get_slideshow($id);
		}

		if ($slide) {
			$this->response([
				'status' => true,
				'message' => 'Berhasil mendapatkan data',
				'data' => $slide
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
		$this->form_validation->set_rules('foto', 'Foto', 'required');
		$this->form_validation->set_rules('text_slide', 'Text', 'required');

		if ($this->form_validation->run() == false) {
			$this->response([
				'status' => false,
				'data' => [
					'fotoError' => form_error('foto'),
					'text_slideError' => form_error('text_slide'),
				],
				'message' => validation_errors(),
			], REST_Controller::HTTP_OK);
		} else {
			$data = [
				'img_slide' => $this->post('foto'),
				'text_slide' => $this->post('text_slide')
			];

			if ($this->Model->post_slideshow($data) > 0) {
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
		$this->form_validation->set_rules('text_slide', 'Text', 'required');

		if ($this->form_validation->run() == false) {
			$this->response([
				'status' => false,
				'data' => [
					'text_slideError' => form_error('text_slide'),
				],
				'message' => validation_errors(),
			], REST_Controller::HTTP_OK);
		} else {
			$id = $this->put('id');
			$data = [
				'text_slide' => $this->put('text_slide')
			];

			$update = $this->Model->put_slideshow($id, $data);
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

	public function index_delete()
	{
		$id = $_GET['id'];
		if ($id == null) {
			$this->response([
				'status' => false,
				'data' => 'ID tidak ditemukan'
			], REST_Controller::HTTP_OK);
		} else {
			if ($this->Model->delete_slideshow($id) > 0) {
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
