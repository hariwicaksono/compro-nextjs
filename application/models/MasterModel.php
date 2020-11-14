<?php  
defined('BASEPATH') OR exit('No direct script access allowed');

class MasterModel extends CI_Model {

    public function cek_login($user,$password)
	{
		return $this->db->get_where('users',['email' => $user , 'password'=>$password])->result_array();
    }

}