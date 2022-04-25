<?php  
defined('BASEPATH') OR exit('No direct script access allowed');

class MasterModel extends CI_Model {

    public function cek_login($user,$password)
	{
		return $this->db->get_where('users',['email' => $user , 'password'=>$password])->result_array();
	}
	
	public function get_user($id = null)
	{
		if ($id == null) {
		$this->db->select('id,name,email,username,created_at');
        $this->db->from('users');
        $query = $this->db->get();
        return $query->result_array();
		} else {
		$this->db->select('id,name,email,username,created_at');
		$this->db->from('users');
		$this->db->where('email', $id);
		$query = $this->db->get();
		return $query->result_array();
		}
	}

	public function post_user($data)
	{
		$this->db->insert('users',$data);
		return $this->db->affected_rows();
	}

	public function delete_user($id = null)
	{
		$this->db->delete('users',['id' => $id]);
		return $this->db->affected_rows();
	}

	public function put_user($id,$data)
	{
		$this->db->update('users',$data,['id'=>$id]);
		return $this->db->affected_rows();
	}

	public function put_userpass($id,$data)
	{
		$this->db->update('users',$data,['email'=>$id]);
		return $this->db->affected_rows();
	}

    public function get_blog($id = null)
	{
		if ($id == null) {
        $this->db->select('p.*, c.name as category, u.name as user');
        $this->db->from('posts p');
        $this->db->join('categories c', 'c.id = p.category_id');
        $this->db->join('users u', 'u.id = p.user_id');
        $this->db->order_by('p.id', 'DESC');
        $query = $this->db->get();
        return $query->result_array();
		} else {
        $this->db->select('p.*, c.name as category, u.name as user');
        $this->db->from('posts p');
        $this->db->join('categories c', 'c.id = p.category_id');
        $this->db->join('users u', 'u.id = p.user_id');
        $this->db->where('p.id', $id);
        $this->db->order_by('p.id', 'DESC');
        $query = $this->db->get();
		return $query->result_array();
		}
	}	
	
	public function count_blog()
	{
		return $this->db->count_all('posts');
	}

	public function post_blog($data)
	{
		$this->db->insert('posts',$data);
		return $this->db->affected_rows();
	}

	public function put_blog($id,$data)
	{
		$this->db->update('posts',$data,['id'=>$id]);
		return $this->db->affected_rows();
	}

	public function delete_blog($id = null)
	{
		$this->db->delete('posts',['id' => $id]);
		return $this->db->affected_rows();
	}
    
    public function get_setting($id)
	{ 
		return $this->db->get_where('settings',['id'=>$id])->result_array();
	}

	public function put_setting($id,$data)
	{
		$this->db->update('settings',$data,['id'=>$id]);
		return $this->db->affected_rows();
	}

	public function get_slideshow($id = null)
	{
		if ($id == null) {
			return $this->db->get('sliders')->result_array();
		} else { 
			return $this->db->get_where('sliders',['id'=>$id])->result_array();
		}
	}

	public function post_slideshow($data)
	{
		$this->db->insert('sliders',$data);
		return $this->db->affected_rows();
	}

	public function put_slideshow($id,$data)
	{
		$this->db->update('sliders',$data,['id'=>$id]);
		return $this->db->affected_rows();
	}

	public function delete_slideshow($id = null)
	{
		$this->db->delete('sliders',['id' => $id]);
		return $this->db->affected_rows();
	}

	public function get_category($id = null)
	{
		if ($id == null) {
			return $this->db->get('categories')->result_array();
		} else { 
			return $this->db->get_where('categories',['id'=>$id])->result_array();
		}
	}

	public function count_category()
	{
		return $this->db->count_all('categories');
	}

	public function post_category($data)
	{
		$this->db->insert('categories',$data);
		return $this->db->affected_rows();
	}

	public function put_category($id,$data)
	{
		$this->db->update('categories',$data,['id'=>$id]);
		return $this->db->affected_rows();
	}

	public function delete_category($id = null)
	{
		$this->db->delete('categories',['id' => $id]);
		return $this->db->affected_rows();
	}

	public function search_blog($id='')
	{
		if ($id === '') {
			
		} else {
			$this->db->select('*');
			$this->db->from('posts');
			$this->db->like('title', $id);
			$this->db->or_like('summary', $id);
			$this->db->or_like('body', $id);
			$query = $this->db->get();
			return $query->result_array();
		}
	}

	public function get_comment($id = null){
		if ($id == null) {
			return $this->db->get('comments')->result_array();
		} else { 
			$query = $this->db->get_where('comments', array('post_id' => $id, 'active' => 'true'));
			return $query->result_array();
		}
		
	}
	
	public function count_comment()
	{
		return $this->db->count_all('comments');
	}

	public function post_comment($data)
	{
		$this->db->insert('comments',$data);
		return $this->db->affected_rows();
	}

	public function put_comment($id,$data)
	{
		$this->db->update('comments',$data,['id'=>$id]);
		return $this->db->affected_rows();
	}
	
	public function get_tag($category)
	{
        $this->db->select('p.*, c.name as category, u.name as user');
        $this->db->from('posts p');
        $this->db->join('categories c', 'c.id = p.category_id');
        $this->db->join('users u', 'u.id = p.user_id');
        $this->db->where('c.name', $category);
        $this->db->order_by('p.id', 'DESC');
        $query = $this->db->get();
		return $query->result_array();
	}	

}