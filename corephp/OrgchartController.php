<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\Input;
use Illuminate\Http\Request;
use App\Orgchart;
use App\CompanyGroup;
use App\Staff;
use DB;
use Symfony\Component\HttpFoundation\Session\Session;

class OrgchartController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {		
		$ismobile = $request->is_mobile;
		if($ismobile == 1)
		{
			$loginid = $request->id;
			$company_id = $request->company_id;
			if($company_id == 1 && $loginid == 1)
				$companies = CompanyGroup::where('deletestatus', '0')->get();
			else {
				$companies = CompanyGroup::where('deletestatus', '0')->whereIn('companygroup_id', [1, $company_id])->get();
			}
		}
		else
		{
			$session = new Session();
			$loginid = $session->get('ses_login_id');
			$company_id = $session->get('ses_company_id');
			if($company_id == 1 && $loginid == 1)
				$companies = CompanyGroup::where('deletestatus', '0')->get();
			else {
				$companies = CompanyGroup::where('deletestatus', '0')->whereIn('companygroup_id', [1, $company_id])->get();
			}	
		}
					
	
		if($request->is_mobile == 1) {
			//return view('Orgchart.webview_index',['companies'=>$companies,'loginid'=>$loginid]);
			$parents = $childs = $grandchilds = '';
			$firstLevel = DB::table('staffs')->where('report_to','0')->where('company_id', $company_id)->where('staff_id', '!=', '1')->where('status','0')->get();
			//print_r($firstLevel);
			if($firstLevel) {
				$i = 0;
				foreach($firstLevel as $parent) {
					$parents[$i]['staff_id'] = $parent->staff_id;
					$parents[$i]['firstname'] = $parent->firstname;
					$parents[$i]['lastname'] = $parent->lastname;
					$parents[$i]['email'] = $parent->email;
					$parents[$i]['photo'] = $parent->photo;
					$parents[$i]['personalhashtag'] = $parent->personalhashtag;
					$parents[$i]['job_position'] = $parent->job_position;
					$parents[$i]['report_to'] = $parent->report_to;
					$parents[$i]['company_id'] = $parent->company_id;
					$parents[$i]['role_id'] = $parent->role_id;
					$parents[$i]['country_id'] = $parent->country_id;
					$parents[$i]['contact_number'] = $parent->contact_number;
					$secondLevel = DB::table('staffs')->where('report_to',$parent->staff_id)->where('company_id',$company_id)->where('status','0')->get();
					if($secondLevel) {
						$j = 0; $childs = '';
						foreach($secondLevel as $secondChild) {
							$childs[$j]['staff_id'] = $secondChild->staff_id;
							$childs[$j]['firstname'] = $secondChild->firstname;
							$childs[$j]['lastname'] = $secondChild->lastname;
							$childs[$j]['email'] = $secondChild->email;
							$childs[$j]['photo'] = $secondChild->photo;
							$childs[$j]['personalhashtag'] = $secondChild->personalhashtag;
							$childs[$j]['job_position'] = $secondChild->job_position;
							$childs[$j]['report_to'] = $secondChild->report_to;
							$childs[$j]['company_id'] = $secondChild->company_id;
							$childs[$j]['role_id'] = $secondChild->role_id;
							$childs[$j]['country_id'] = $secondChild->country_id;
							$childs[$j]['contact_number'] = $secondChild->contact_number;
							$thirdLevel = DB::table('staffs')->where('report_to',$secondChild->staff_id)->where('company_id',$company_id)->where('status','0')->get();
							if($thirdLevel) {
								$k = 0; $grandchilds = '';
								foreach($thirdLevel as $thirdChild) {
									$grandchilds[$k]['staff_id'] = $thirdChild->staff_id;
									$grandchilds[$k]['firstname'] = $thirdChild->firstname;
									$grandchilds[$k]['lastname'] = $thirdChild->lastname;
									$grandchilds[$k]['email'] = $thirdChild->email;
									$grandchilds[$k]['photo'] = $thirdChild->photo;
									$grandchilds[$k]['personalhashtag'] = $thirdChild->personalhashtag;
									$grandchilds[$k]['job_position'] = $thirdChild->job_position;
									$grandchilds[$k]['report_to'] = $thirdChild->report_to;
									$grandchilds[$k]['company_id'] = $thirdChild->company_id;
									$grandchilds[$k]['role_id'] = $thirdChild->role_id;
									$grandchilds[$k]['country_id'] = $thirdChild->country_id;
									$grandchilds[$k]['contact_number'] = $thirdChild->contact_number;
									++$k;
								}
								$childs[$j]['grandchilds'] = $grandchilds;
							}
							++$j;
						}
						$parents[$i]['childs'] = $childs;
					}
					++$i;
				}
			}
			return response()->json(['companies' => $companies, 'loginid' => $loginid, 'parents' => $parents]);
			//return view('Orgchart.webview_index',['companies'=>$companies, 'loginid' => $loginid]);	
		}
		else {
			return view('Orgchart.index',['companies'=>$companies]);
		}
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
		$countries = DB::table('countries')->get();		
		$session = new Session();
		$loginid = $session->get('ses_login_id');
		$company_id = $session->get('ses_company_id');
		if($loginid == 1)
		$companies = CompanyGroup::where('deletestatus', '0')->get();		
		else 
		$companies = CompanyGroup::where('deletestatus', '0')->where('companygroup_id',$company_id)->get();				
		
	
		$reportto = Staff::where('status', '0')->where('company_id',$company_id)->get();				
		return view('Orgchart.create', ['countries' => $countries, 'companies' => $companies, 'reportto' => $reportto]);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

		//I am modified below line sunday 31-07-2017 if($request->photo==''){			$request->photo='';		}-Kannan.N
					
		if($request->photo==''){
			$request->photo='';
		}
		$session = new Session();
		if($request->is_mobile == 1)
			$staffdata['photo'] = $request->photo;
		else
		{
			$file = Input::file('photo');
			if($file)
			{		
				//Upload staff photo
				$destinationPath = public_path().'/staffphotos';			
				$timestamp = str_replace([' ', ':'], '-', date("YmdHis"));
				$photo = $timestamp."_123_".$file->getClientOriginalName();
				$upload_success = Input::file('photo')->move($destinationPath, $photo);
				$staffdata['photo'] = $photo;
			}
			
		}
		//
		$staffdata['firstname'] = $request->firstname;
		$staffdata['lastname'] = $request->lastname;
		$staffdata['email'] = $request->email;
		$staffdata['contact_number'] = $request->contact_number;
		$staffdata['non_user'] = '1';
		$staffdata['role_id'] = 0;
		$staffdata['company_id'] = $request->company_id;
		$staffdata['country_id'] = $request->country_id;
		$staffdata['job_position'] = $request->job_position;
		$staffdata['report_to'] = $request->report_to;
		$staffdata['personalhashtag'] = '';							
		$last_insertid = DB::table('staffs')->insertGetId($staffdata);
		DB::table('orgchart')->insert(
		['orgchart_staff_id'=>$last_insertid,'orgchart_report_to' => $request->report_to,'orgchart_company_id'=>$request->company_id]
		);		
		if($request->is_mobile == 1) {
			$msg = array(array('Error' => '0','result'=>'Org Chart created successfully'));						
			return response()->json(['msg'=>$msg]);
		}
		else {
			$session = new Session();
			$company_id = $session->get('ses_company_id');
			// set flash messages
			$session->getFlashBag()->add('nonuser_created', 'Non User created successfully');
			return redirect('/orgchart?company_id='.$company_id);
		}
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
		$session = new Session();
		$loginid = $session->get('ses_login_id');
        	$staffdata = Staff::where('staff_id', $id)->get();
		$countries = DB::table('countries')->get();		
		
			

		$company_id = $session->get('ses_company_id');
		if($loginid == 1)
		$companies = CompanyGroup::where('deletestatus', '0')->get();		
		else 
		$companies = CompanyGroup::where('deletestatus', '0')->where('companygroup_id',$company_id)->get();		
	
				
		//$reportto = Staff::where('status', '0')->where('staff_id', '!=', $loginid)->where('company_id',$staffdata[0]->company_id)->get();		
		$reportto = Staff::where('status', '0')->where('company_id',$staffdata[0]->company_id)->get();				
		return view('Orgchart.edit', ['countries' => $countries,'companies'=>$companies,'reportto'=>$reportto,'staffdata'=>$staffdata,'loginid'=>$loginid]);
    }
	
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
		
		$photo = '';
		$id = $request->staff_id;
		if($request->is_mobile == 1) {
			$photo = $request->photo;
			$id = $request->staff_id;
		}
		else
		{
			$file = Input::file('photo');
			if($file)
			{		
				//Upload staff photo
				$destinationPath = public_path().'/staffphotos';			
				$timestamp = str_replace([' ', ':'], '-', date("YmdHis"));
				$photo = $timestamp."_123_".$file->getClientOriginalName();
				$upload_success = Input::file('photo')->move($destinationPath, $photo);				
			}
			
		}
		if($photo != '')
			$staffdata['photo'] = $photo;
		else
		{
			$staff = Staff::where('staff_id', $request->staff_id)->select('photo')->get();
			if($staff) { $staffdata['photo'] = $staff[0]->photo; }
		}
		$staffdata['firstname'] = $request->firstname;
		$staffdata['lastname'] = $request->lastname;
		$staffdata['email'] = $request->email;
		$staffdata['contact_number'] = $request->contact_number;
		$staffdata['non_user'] = '1';
		$staffdata['role_id'] = 0;
		$staffdata['company_id'] = $request->company_id;
		$staffdata['country_id'] = $request->country_id;
		$staffdata['job_position'] = $request->job_position;
		$staffdata['report_to'] = $request->report_to;
	
		DB::table('staffs')->where('staff_id',$id)->update($staffdata);
		DB::table('orgchart')->where('orgchart_staff_id',$id)
		->update(['orgchart_report_to' => $request->report_to,'orgchart_company_id'=>$request->company_id]
		);		
		if($request->is_mobile == 1) {
			$msg = array(array('Error' => '0','result'=>'Staff details Updated successfully'));
			return response()->json(['msg'=>$msg]);
		}
		else {
			$session = new Session();
			$company_id = $session->get('ses_company_id');
			// set flash messages
			$session->getFlashBag()->add('nonuser_updated', 'Staff details updated successfully');
			return redirect('/orgchart?company_id='.$company_id);
		}
        //
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
	function getdetails(Request $request) {
		//$orgdata = Staff::find($request->id);
		$result = "";
        $hashtag="";
        $staffid="0";
       // if($request->ajax())
        //{
            $details=DB::table('staffs')->where('staff_id',$request->id)->get();
            $fname=$details[0]->firstname;
            $lname=$details[0]->lastname;
            $img = $details[0]->photo;
			if(is_file(public_path() . '/staffphotos/'.$img)) {
				$image = 'http://denyoappv2.stridecdev.com/staffphotos/'.$details[0]->photo;
			}
			else
			$image = 'http://denyoappv2.stridecdev.com/images/default.png';
            $email=$details[0]->email;
            $mobile=$details[0]->contact_number;
            $jobposition=$details[0]->job_position;
            $hashtag=(isset($details[0]->personalhashtag) ? '' : '');
            $staff_id=$details[0]->staff_id;                     
        //}        
//		echo public_path() . '/staffphotos/'.$img;
//	echo $image;
	//	die;
        $result = $fname."#".$lname."#".$email."#".$mobile."#".$image."#".$jobposition."#".$hashtag."#".$staff_id;        
        echo $result;
	}
	
	public function deletedetails($id,$ismobile,$currentcid) {
		DB::table('staffs')->where('staff_id',$id)->update(array('status' => '1'));
		//DB::table('users')->where('staffs_id',$id)->update(array('deletestatus' => '1'));
		DB::table('orgchart')->where('orgchart_staff_id',$id)->delete();
		//$firstLevel = Staff::where('report_to','0')->where('company_id',1)->get();
		if($ismobile == 0) {
			$session = new Session();
			$session->getFlashBag()->add('non_deleted','Non User deleted successfully');
			return redirect('/orgchart?company_id='.$currentcid);
		}
		else {
			$msg = array(array('Error' => '0','result'=>'OrgChart deleted successfully'));
			return response()->json(['msg'=>$msg]);
		}
	}	
}
