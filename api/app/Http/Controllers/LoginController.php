<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\User;
use Auth;
use Session;
use DB;

class LoginController extends Controller {
	
	public function index()
	{
		return view('login');
	}

	public function checklogin(Request $request)
	{
		if(!empty($request->input()))
		{
			$username = $request->input('username');
			$password = $request->input('password');
			$isapp = $request->input('isapp');
			if($password)
			{
				$password = md5($password);
			}			
			$staffs = DB::select('CALL checkLogin(?, ?)', array($username, $password));
			if($staffs)
			{
				$staffdetails = $staffs[0];
				Session::put('ses_login_id', $staffdetails->staff_id);
				Session::put('ses_firstname', $staffdetails->firstname);
				Session::put('ses_lastname', $staffdetails->lastname);
				$msg = array(array('result' => 'success'));
				if($isapp == 0)
					return redirect('dashboard');
				else
				{
					return response()->json(['msg' => $msg, 'staffdetails' => $staffs]);
				}
			}
			else
			{
				$staffs = array(array(''));
				$msg = array(array('result' => 'failed'));
				if($isapp == 0)
				{
					Session::flash('message', 'Invalid Login Credentials!');
					return redirect('/');
				}
				else
				{
					return response()->json(['msg' => $msg, 'staffdetails' => $staffs]);
				}
			}		
		}
		else
		{
			return redirect('/');
		}
	}

	public function logout()
	{
		Auth::logout();	
		Session::flush();
		return redirect('/');
	}
} //class

?>
