<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\User;
use App\Staff;
use Auth;
use DB;
use Mail;
use Symfony\Component\HttpFoundation\Session\Session;

class LoginController extends Controller {
	public function index()
	{
		$session = new Session();
		$ses_login_id = $session->get('ses_login_id');
		$mainmenu = $session->get('mainmenu');
		$roleaccess = DB::table('parent_module')->where('id',$mainmenu[0])->get();
		if(!$ses_login_id) {
			return view('login');
		}
		else {
			if(count($roleaccess) > 0)
			header('Location:http://denyoappv2.stridecdev.com/'.strtolower($roleaccess[0]->name));
			exit;
		}		
	}
	
	public function checklogin(Request $request)
	{
		$roledata = '';
		if(!empty($request->input()))
		{
			$username = $request->input('username');
			$password = $request->input('password');
			$devicetoken = $request->input('device_token');
			$isapp = $request->input('isapp');
			if($password)
			{
				$password = base64_encode($password);
			}			
			//$staffs = DB::select('CALL checkLogin(?, ?)', array($username, $password));
			$staffs = DB::table('staffs')->join('users', 'users.staffs_id', '=', 'staffs.staff_id')->where('staffs.status','0')->where('users.username', $username)->where('users.password', $password)->get();
			if(count($staffs) > 0)
			{
				$staffdetails = $staffs[0];
				$session = new Session();
				//$session->set('ses_login_id', $staffdetails->staff_id);
				$session->set('ses_login_id', $staffdetails->staff_id);
				$session->set('ses_firstname', $staffdetails->firstname);
				$session->set('ses_lastname', $staffdetails->lastname);
				$session->set('ses_company_id', $staffdetails->company_id);
				//$session->set('role_id', $staffdetails->role_id);
				if($staffdetails->role_id != 0) {
					$roledata = DB::table('role_permissions')->where('role_id',$staffdetails->role_id)->get();
				}
				//
//echo '<pre>';
				if(count($roledata) > 0) {
					foreach($roledata as $rdata) {						
						$parents[] = $rdata->module_name;
						$childs[] = $rdata->page_name;
					}
					$parentpage = array_unique($parents);
					
					foreach($parentpage as $parent) {
						$parent_viewcount = DB::table('role_permissions')->where('module_name',$parent)
												->where('view_action','1')->where('role_id',$staffdetails->role_id)->get();
																		
						if(count($parent_viewcount) > 0) {
							$mainmenu[] = $parent_viewcount[0]->module_name;							 
						}
						//$child_viewcount = DB::table('role_permissions')->where('page_name',$parent)
												// ->where('view_action','1')->get()->count();
						// if($child_viewcount) {
							
						// }
					}					
					$session->set('mainmenu',$mainmenu);

				}
				$msg = array(array('result' => 'success'));
				if($isapp == 0)
				{	
					$redirectto = $session->get('mainmenu');
					if(count($redirectto) > 0) {
						$roleaccess = DB::table('parent_module')->where('id',$redirectto[0])->get();					
						return redirect(strtolower($roleaccess[0]->name));
					}
				}
				else
				{						
					if($devicetoken != '')
					{			
						$findToken = DB::table('devicetokens')->where('staffid',$staffdetails->staff_id)->get();
						if(count($findToken))
						{					
							$tokendev = DB::table('devicetokens')->where('staffid', $staffdetails->staff_id)->update(array('deviceid' => $devicetoken));
						}
						else
						{
							$tokendev = DB::table('devicetokens')->insert(array('staffid' => $staffdetails->staff_id,'deviceid' => $devicetoken));
						}
					}
					
					
					return response()->json(['msg' => $msg, 'staffdetails' => $staffs,'roledata'=>$roledata]);
				}
			}
			else
			{			
				if($isapp == 0)
				{
					$session = new Session;					
					$session->set('error', 'Invalid Login Credentials!');
					return redirect('/');
				}
				else
				{
					$staffs = array(array(''));
					$msg = array(array('Error' => '1','result'=>'Invalid Login Credentials!'));
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
		$session = new Session;
		Auth::logout();	
		$session->set('ses_login_id', '');
		$session->set('ses_company_id', '');
		$session->set('error', '');
		return redirect('/');
	}
	
	function forgetpassword() {
		return view('forgetpassword');
	}
	
	function forgetpassprocess(Request $request) {
		$session = new Session;
		$username = $request->username;		
		$useremail = $request->useremail;
//		$checkusername = User::where('usernam',$username)->get()->count();
		$checkusername = DB::table('users')->where('username',$username)->get();
		$checkuseremail = Staff::where('email',$useremail)->get()->count();	
				
		if(count($checkusername) > 0 && $checkuseremail > 0) { //Valid user
			$userdetails = DB::table('users')->where('username',$username)->select('password')->get();
			$subject = 'Denyo App Forget Password';
			$content = 'Welcome to denyo <br/>';
			$content .= 'Your Password: <b>' . base64_decode($userdetails[0]->password) . '</b>';
			$data = array( 'subject' => $subject, 'content' => $content );		
			Mail::send('emails.service', $data, function ($m) use ($data, $useremail)  {
				$m->from('cip@stridececommerce.com', 'Denyo');				
				$m->to($useremail, '')->subject($data['subject']);
			});
			if($request->is_mobile == 1) {
				$msg = array(array('Error'=>'0','result' => 'success'));
				return response()->json(['msg' => $msg]);
			}
			else {
				//$request->session()->flash('passwordemailsent', 'Task was successful!');
				$session->set('passwordemailsent', 'Password sent to your Email id.');
				return redirect('/');				
			}
		}
		else {			
			if($request->is_mobile == 1) {				
				$msg = array(array('Error' => '1','result'=>'Invalid User!'));
				return response()->json(['msg' => $msg]);				
			}
			else {
				$session->set('invalidforgetpassword', 'Invalid username / Email');
				return redirect('/');
			}
		}
	}
} //class
?>