<?php  

use Restserver\Libraries\REST_Controller;
defined('BASEPATH') OR exit('No direct script access allowed');
 

require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';

class LoginController extends REST_Controller
{

	public function __construct($config = 'rest')
    {
        parent::__construct($config);
        $this->load->model('MasterModel','Model');
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
        $method = $_SERVER['REQUEST_METHOD'];
        if($method == "OPTIONS") {
            die();
        }
    }


	public function index_post()
	{
		$user = $this->post('username');
		$password = md5($this->post('password'));
		$query1 = $this->db->query("SELECT status_user FROM users WHERE email LIKE '%$user%' and status_user = 'User' ");
		$row = $query1->row_array();
		$isuser = $row['status_user'];
		$query2 = $this->db->query("SELECT status_user FROM users WHERE email LIKE '%$user%' and status_user = 'Admin' ");
		$row = $query2->row_array();
		$isadmin = $row['status_user'];

		if ($isuser == "User") {
			$cek = $this->Model->cek_login($user,$password);
			if ($cek) {
				$this->response([
					'id' => '1',
					'data' => $cek
				],REST_Controller::HTTP_OK);
			} else {
					$this->response([
					'id'=> '404',
					'data' => 'Data Not Found 1'
				],REST_Controller::HTTP_OK);
			}
		} else if ($isadmin == "Admin"){
			$cek = $this->Model->cek_login($user,$password);
			if ($cek) {
				$this->response([
					'id' => '2',
					'data' => $cek
				],REST_Controller::HTTP_OK);
			} else {
					$this->response([
					'id'=> '404',
					'data' => 'Data Not Found'
				],REST_Controller::HTTP_OK);
			}
		} else{
			$this->response([
				'id'=> '404',
				'data' => 'Data Not Found'
			],REST_Controller::HTTP_OK);
		}
	}



}