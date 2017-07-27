<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use DB;
use App\Unit;
use App\Comment;
use App\Service;
use App\Staff;
use App\Alarm;
use App\CompanyGroup;
use Illuminate\Support\Facades\Input;
use Illuminate\Html\HtmlServiceProvider;
use File;
use Response;
use Mail;
use Symfony\Component\HttpFoundation\Session\Session;
use App\DataTables\CommentDataTable;
use Yajra\Datatables\Html\Builder;
use Symfony\Component\Finder\Finder;

class CommentController extends Controller
{
	
	/**
	* Display a listing of the resource.
	*
	* @return \Illuminate\Http\Response
	*/
	public function index(Request $request, CommentDataTable $dataTable)
	{				
		$ismobile = $request->is_mobile;
		$unitid = $request->unitid;
		if($ismobile == 1)
		{
			$startindex = $request->input('startindex'); // start limit
			$results = $request->input('results'); // end limit		
			$sort = $request->input('sort');
			$dir = $request->input('dir');
			
			$allcomments = DB::table('eventorcomments')->orderBy('dateandtime', 'desc')->where('event_unit_id',$unitid)->get();
			
			$comments = array();
			
			if(count($allcomments) > 0)
			{	
				$i = 0;
				foreach($allcomments as $allcomment)
				{
					if($allcomment->event_type == "S")
					{
						$services = Service::where('service_id', $allcomment->type_table_id)->get();
						
						if($services)
						{
							$service = $services[0];
							$comments[$i]['service_id'] = $service->service_id;
							$comments[$i]['service_unitid'] = $service->service_unitid;
							$comments[$i]['serviced_by'] = $service->serviced_by;
							$comments[$i]['serviced_datetime'] = $service->serviced_datetime;
							$comments[$i]['service_subject'] = $service->service_subject;
							$comments[$i]['service_remark'] = $service->service_remark;
							$comments[$i]['service_priority'] = $service->service_priority;
							$comments[$i]['next_service_date'] = $service->next_service_date;
							$comments[$i]['is_request'] = $service->is_request;
							$staff = Staff::where('staff_id', $service->serviced_by)->select('firstname')->get();
							if(count($staff))
								$comments[$i]['serviced_by_name'] = $staff[0]->firstname;
							else
								$comments[$i]['serviced_by_name'] = '';
							$serviceresources = '';
							$resources = DB::table('service_resources')->where('services_id', $service->service_id)->get();
							if($resources)
							{
								foreach($resources as $resource)
								{
									$serviceresources[] = $resource->service_resource_id.'|'.$resource->service_resource;
								}
								if($serviceresources)
									$serviceresources = @implode('#-#', $serviceresources);
							}
							$comments[$i]['service_resources'] = $serviceresources;
							$comments[$i]['event_type'] = $allcomment->event_type;
							++$i;
						}
						
					}
					
					else if($allcomment->event_type == "C")
					{
						$commentlist = DB::table('comments')->where('comment_id', $allcomment->type_table_id)->get();
				
						if(count($commentlist) > 0)
						{
							$comment = $commentlist[0];
							$comments[$i]['comment_id'] = $comment->comment_id;
							$comments[$i]['comment_unit_id'] = $comment->comment_unit_id;
							$comments[$i]['comment_by'] = $comment->comment_by;
							$comments[$i]['comment_subject'] = $comment->comment_subject;
							$comments[$i]['comment_remark'] = $comment->comment_remark;
							$comments[$i]['comment_priority'] = $comment->comment_priority;
							$staff = Staff::where('staff_id', $comment->comment_by)->select('firstname')->get();
							$comments[$i]['comment_by_name'] = $staff[0]->firstname;
							$commentresources = '';
							$resources = DB::table('comment_resources')->where('comment_resource_id', $comment->comment_id)->get();
							if($resources)
							{
								foreach($resources as $resource)
								{
									$commentresources[] = $resource->comment_resource_id.'|'.$resource->comment_resource;
								}
								if($commentresources)
									$commentresources = @implode('#-#', $commentresources);
							}
							$comments[$i]['comment_resources'] = $commentresources;
							$comments[$i]['event_type'] = $allcomment->event_type;
							++$i;
						}
					}
					else if($allcomment->event_type == "A" || $allcomment->event_type == "OA")
					{
						$alarmlist = DB::table('alarms')->where('alarm_id', $allcomment->type_table_id)->get();
				
						if(count($alarmlist) > 0)
						{
							$comment = $alarmlist[0];
							$comments[$i]['comment_id'] = $comment->alarm_id;
							$comments[$i]['alarm_name'] = $comment->alarm_name;
							$comments[$i]['alarm_unit_id'] = $comment->alarm_unit_id;
							$comments[$i]['alarm_assigned_by'] = $comment->alarm_assigned_by;
							$comments[$i]['alarm_assigned_to'] = $comment->alarm_assigned_to;							
							$comments[$i]['alarm_received_date'] = $comment->alarm_received_date;
							$comments[$i]['alarm_priority'] = $comment->alarm_priority;
							$staff = Staff::where('staff_id', $comment->alarm_assigned_by)->select('firstname')->get();
							if(count($staff) > 0) {
								$comments[$i]['alarm_assigned_by'] = $staff[0]->firstname;							
							}	
							$comments[$i]['event_type'] = $allcomment->event_type;
							++$i;
						}
					}					
				}
			}

			return response()->json(['msg' => array('result'=>'success'), 'totalCount'=>$allcomments->count(), 'comments' => $comments]);
		}
		else
			return $dataTable->render('Comment.index', ['unitid' => $unitid]);
	}

	/**
	* Show the form for creating a new resource.
	*
	* @return \Illuminate\Http\Response
	*/
	public function createcomment($unitid)
	{
		$session = new Session();
		$ses_login_id = $session->get('ses_login_id');
		$units = Unit::where('unit_id', $unitid)->select('unitname', 'projectname', 'location', 'controllerid')->get();
		$unit = $units[0];
		$currentstatus = DB::table('unit_currentstatus')->where('generatorid', $unit->controllerid)->where('code', 'RUNNINGHR')->get();
		$runninghrs = 0;
		if($currentstatus)
			$runninghrs = $currentstatus[0]->value;
		$microtimestamp = date("YmdHis");
		$session = new Session();
		$company_id = $session->get('ses_company_id');
		$staffid = $session->get('ses_login_id');
		$serviceby = Staff::where('staff_id', $staffid)->select('firstname', 'lastname')->get();
		$staffname = $serviceby[0]->firstname;
		$staffs = DB::table('users')->where('users.company_id', $company_id)->join('staffs','staffs.staff_id','=','users.staffs_id')->where('staffs.non_user',0)->get();
		$staffids = '';
		if($staffs)
		{
			foreach($staffs as $staff)
			{
				$staffids[] = "'".$staff->username."'";
			}
			if(is_array($staffids) && $staffids)
				$staffids = @implode(',', $staffids);
		}
		return view('Comment.create', ['unitid' => $unitid, 'units' => $unit, 'runninghrs' => $runninghrs, 'microtimestamp' => $microtimestamp, 'staffname' => $staffname, 'staffids' => $staffids, 'staffid' => $staffid,'ses_login_id'=>$ses_login_id]);
	}

	/**
	* Store a newly created resource in storage.
	*
	* @param  \Illuminate\Http\Request  $request
	* @return \Illuminate\Http\Response
	*/
	public function store(Request $request)
	{	
//echo '<pre>';	
	//	print_r($request->all());
		$ismobile = $request->is_mobile;		
		$commentdata['comment_unit_id'] = $request->comment_unit_id;
		$commentdata['comment_by'] = $request->comment_by;
		
		$commentdata['comment_subject'] = $request->comment_subject;
		$remark = str_replace('<span data-atwho-at-query="@" class="atwho-inserted">', '', trim($request->comment_remark));
		$remark = str_replace('</span>', '', $remark);
		$remark = str_replace('&nbsp;', '', $remark);
		$remark = str_replace('<br>', '', $remark);
		$remark = str_replace('?', '', $remark);
		$remark = str_replace('\xE2\x80\x8D', '', $remark);
		
		$remark = str_replace('\u200d', '', $remark);     
		$remark = preg_replace('/[^A-Za-z0-9 @.]/u','', strip_tags($remark));				
		$remark = strip_tags(stripslashes($remark));
		
		$remark = strip_tags($remark);
		
		$commentdata['comment_remark'] = $remark;
		$commentdata['comment_priority'] = $request->comment_priority;

		$staff = Staff::where('staff_id', $request->comment_by)->select('firstname', 'email')->get();
		$unit = Unit::where('unit_id', $request->comment_unit_id)->select('unitname', 'projectname', 'location')->get();

		// Store service form data in services table.
		DB::table('comments')->insert($commentdata);
		
		// Get services last insert id
		$commentid = 1;
		$lastins = DB::table('comments')->orderBy('comment_id', 'desc')->skip(0)->take(1)->get();
		//print_r($lastins);
		if($lastins)
			$commentid = $lastins[0]->comment_id;
		
		// Update service id in service resources table using micro_timestamp
		DB::table('comment_resources')->where('micro_timestamp', $request->micro_timestamp)->update(['comments_id' => $commentid]);

		// Insert data for service notification to show count in unit details 
		DB::table('comment_notifications')->insert(['comment_unit_id' => $request->comment_unit_id, 'comment_staff_id' => $request->comment_by, 'comments_id' => $commentid]);

		// Insert data for show in events / comments.
		DB::table('eventorcomments')->insert(['event_type' => 'C', 'event_unit_id'=>$request->comment_unit_id,'type_table_id' => $commentid, 'dateandtime' => date("Y-m-d H:i:s")]);
		
		// get notify content for send push notifications
		$notifycontent = '';		
		$notifys = DB::table('notification_content')->where('notify_type', 'C')->get();
		//print_r($notifys);
		if($notifys)
		{			
			$notify_content = $notifys[0]->notify_for.'<br>'.$notifys[0]->notify_content;
			$notify_content = str_replace('#NAME#', $staff[0]->firstname, $notify_content);
			$notify_content = str_replace('#UNITNAME#', $unit[0]->unitname, $notify_content);
			$notify_content = str_replace('#PROJECTNAME#', $unit[0]->projectname, $notify_content);
			$notify_content = str_replace('#SUBJECT#', $remark, $notify_content);
			$notifycontent = str_replace('#DATEANDTIME#', date('d M Y h:iA'), $notify_content);
			$notifycontent = nl2br($notifycontent);
		//	print_r($notifycontent);
		}
//die;
		// get the personalhashtags from remark
		$emailids = $mentionids = $notifyids = '';
		$hashtags = @explode(' ', $remark);
		if($hashtags)
		{
			foreach($hashtags as $hashtag)
			{		
				$chkhashtag = substr($hashtag, 0,1); 	
				$hashtag = preg_replace('/[^A-Za-z\-]/', '', $hashtag);					
				if($chkhashtag == "@")
				{
					$hashtag = '@'.$hashtag;
					$staffs = Staff::where('personalhashtag', $hashtag)->select('email', 'staff_id')->get();
					if(count($staffs))
					{
						$emailids[] = $staffs[0]->email;
						$notifyids[] = $staffs[0]->staff_id;							
					}
				}
			}
		}

		if(!$notifyids)
		{
			$alarmnotifys = Unit::where('unit_id', $request->comment_unit_id)->select('alarmhashtags')->get();
			if(count($alarmnotifys) > 0)
			{
				$hashtags = $alarmnotifys[0]->alarmhashtags;
				if($hashtags)
				{
					$hashtags = @explode(",", $hashtags);
					for($i = 0; $i < count($hashtags); $i++)
					{
						$notify_to = Staff::where('personalhashtag',$hashtags[$i])->select('staff_id')->get();
						if(count($notify_to) >0)
							$notifyids[] = $notify_to[0]->staff_id;
					}
				}
			}			
		}
		if(!$emailids)
		{
			$alarmnotifys = Unit::where('unit_id', $request->comment_unit_id)->select('alarmemails')->get();
			if(count($alarmnotifys) > 0)
			{
				$emails = $alarmnotifys[0]->alarmemails;
				if($emails)
				{
					$emails = @explode(",", $emails);
					for($i = 0; $i < count($emails); $i++)
					{
						$emailids[] = $emails[$i];
					}
				}
			}
		}

		if(count($notifyids) > 1)
		{


			// Insert data for send push notifications
			for($i = 0; $i < count($notifyids); $i++)
			{				
				DB::table('pushnotifications')->insert(['notify_subject'=>$request->comment_subject,'notify_content' => $notifycontent, 'notify_by' => $request->comment_by, 'notify_to' => $notifyids[$i], 'notify_type' => 'C', 'table_id' => $commentid]);
			}
		}

		if($emailids)
		{
			$content = '<table width="100%" cellpadding="5" cellspacing="5">';
			$content .= '<tr><td><b>Comment Info:</b><br></td></tr>';
			$content .= '<tr><td>Unit Name: '.$unit[0]->unitname.'</td></tr>';
			$content .= '<tr><td>Project Name: '.$unit[0]->projectname.'</td></tr>';
			$content .= '<tr><td>Location: '.$unit[0]->location.'</td></tr>';
			$content .= '<tr><td>Comment By: '.$staff[0]->firstname.'</td></tr>';
			$content .= '<tr><td>Remark: '.$remark.'</td></tr>';
			$content .= '</table>';			
			$subject = $request->comment_subject;
			$replyto = $staff[0]->email;
			$data = array( 'replytoemail' => $replyto, 'subject' => $subject, 'content' => $content);		
			Mail::send('emails.service', $data, function ($m) use ($data, $emailids)  {
				$m->from('cip@stridececommerce.com', 'Denyo');
				$m->replyTo($data['replytoemail'], $name = null);
				$m->bcc('balamurugan@webneo.in', '');
				$m->to($emailids, '')->subject($data['subject']);
			});
		}		
		
		if($request->is_mobile == 1) {
			$msg = array(array('Error' => '0','result'=>'Comment details created successfully'));			
			return response()->json(['msg'=>$msg]);
		}
		else {
			return redirect('/comments?unitid='.$request->comment_unit_id)->with('alert','Comment details created successfully');	
		}
		
	}

	/**
	* Display the specified resource.
	*
	* @param  \App\Service  $Service
	* @return \Illuminate\Http\Response
	*/
	public function show($id)
	{
		$companyname = '';
		$actual = @explode('-', $id);
		$id = $actual[0];
		$type = strtolower($actual[1]);
		$unitid = $actual[2];
		$units = Unit::where('unit_id', $unitid)->get();
		$units = $units[0];
		$currentstatus = DB::table('unit_currentstatus')->where('generatorid', $units->controllerid)->where('code', 'RUNNINGHR')->get();
		$runninghrs = 0;
		if($currentstatus)
			$runninghrs = $currentstatus[0]->value;
		$staff = array();
		if($type == 'comment')
		{
			$comments = DB::table('comments')->where('comment_id', $id)->get();
			if($comments)
				$comments = $comments[0];
			$commentresources = DB::table('comment_resources')->where('comments_id', $id)->get();
			$staff = Staff::where('staff_id', $comments->comment_by)->select('firstname', 'email', 'photo', 'company_id')->get();
			if($staff)
			{
				$staff = $staff[0];
				$company = CompanyGroup::where('companygroup_id', $staff->company_id)->select('companygroup_name')->get();
				if($company)
					$companyname = $company[0]->companygroup_name;	
			}
			
			DB::table('pushnotifications')->where('table_id', $id)->update(['notify_to_readstatus'=>1]);
			return view('Comment.show', ['comments' => $comments, 'commentresources' => $commentresources, 'units' => $units, 'runninghrs' => $runninghrs, 'staff' => $staff, 'companyname' => $companyname]);
		}
		else if($type == "service")
		{
			$services = Service::where('service_id', $id)->get();
			if($services)
				$services = $services[0];
			$serviceresources = DB::table('service_resources')->where('services_id', $id)->get();
			$staff = Staff::where('staff_id', $services->serviced_by)->select('firstname', 'email', 'photo', 'company_id')->get();
			if($staff)
			{
				$staff = $staff[0];
				$company = CompanyGroup::where('companygroup_id', $staff->company_id)->select('companygroup_name')->get();
				if($company)
					$companyname = $company[0]->companygroup_name;
			}
			return view('Service.show', ['services' => $services, 'serviceresources' => $serviceresources, 'units' => $units, 'runninghrs' => $runninghrs, 'staff' => $staff, 'companyname' => $companyname, 'returnpage' => 'comments']);
		}	
		else
		{
			$alarms = $assignby = $assignto = $assigndate = '';
			$alarms = Alarm::where('alarm_id', $id)->get();
			if($alarms)
			{
				$alarms = $alarms[0];
			
				$alarmassignby = Staff::where('staff_id', $alarms->alarm_assigned_by)->select('firstname')->get();
				if(count($alarmassignby) > 0) { $assignby = $alarmassignby[0]->firstname; }

				$alarmassignto = Staff::where('staff_id', $alarms->alarm_assigned_to)->select('firstname')->get();
				if(count($alarmassignto)) { $assignto = $alarmassignto[0]->firstname; }

				if($alarms->alarm_assigned_date != "0000-00-00 00:00:00" && $alarms->alarm_assigned_date != '')
					$assigndate = date('d M Y h:i A', strotime($alarms->alarm_assigned_date));
			}
			return view('Alarm.show', ['alarms' => $alarms, 'units' => $units, 'runninghrs' => $runninghrs, 'returnpage' => 'alarms', 'assignby' => $assignby, 'assignto' => $assignto, 'assigndate' => $assigndate]);
		}	
	}

	/**
	* Show the form for editing the specified resource.
	*
	* @param  \App\Service  $Service
	* @return \Illuminate\Http\Response
	*/
	public function edit($id)
	{
				
		$comments = DB::table('comments')->where('comment_id',$id)->get();
		
		$comments = $comments[0];
		$commentresources = DB::table('comment_resources')->where('comments_id', $id)->get();
		$unitid = $comments->comment_unit_id;	
		$units = Unit::where('unit_id', $unitid)->select('unitname', 'projectname', 'location', 'controllerid')->get();
		$unit = $units[0];
		$currentstatus = DB::table('unit_currentstatus')->where('generatorid', $unit->controllerid)->where('code', 'RUNNINGHR')->get();
		$runninghrs = 0;
		if($currentstatus)
			$runninghrs = $currentstatus[0]->value;
		$microtimestamp = date("YmdHis");
		$session = new Session();
		$company_id = $session->get('ses_company_id');
		$staffid = $session->get('ses_login_id');
		$commentby = Staff::where('staff_id', $comments->comment_by)->select('firstname', 'lastname')->get();
		$staffname = $commentby[0]->firstname;
		$staffs = DB::table('users')->where('company_id', $company_id)->get();
		$staffids = '';
		if($staffs)
		{
			foreach($staffs as $staff)
			{
				$staffids[] = "'".$staff->username."'";
			}
			if(is_array($staffids) && $staffids)
				$staffids = @implode(',', $staffids);
		}
		
		return view('Comment.edit', ['comments' => $comments, 'commentresources' => $commentresources, 'unitid' => $unitid, 'units' => $unit, 'runninghrs' => $runninghrs, 'microtimestamp' => $microtimestamp, 'staffname' => $staffname, 'staffids' => $staffids, 'staffid' => $staffid]);
		
	}

	/**
	* Update the specified resource in storage.
	*
	* @param  \Illuminate\Http\Request  $request
	* @param  \App\Service  $Service
	* @return \Illuminate\Http\Response
	*/
	public function update(Request $request)
	{		
	
		$ismobile = $request->is_mobile;
		$commentid = $request->comment_id;
		$commentdata['comment_unit_id'] = $request->comment_unit_id;
		$commentdata['comment_by'] = $request->comment_by;
		$commentdata['comment_subject'] = $request->comment_subject;
		$remark = str_replace('<span data-atwho-at-query="@" class="atwho-inserted">', '', trim($request->comment_remark));
		$remark = str_replace('</span>', '', $remark);
		$remark = str_replace('&nbsp;', '', $remark);
		$remark = str_replace('<br>', '', $remark);
		$remark = str_replace('?', '', $remark);
		$remark = str_replace('\xE2\x80\x8D', '', $remark);		
		$remark = str_replace('\u200d', '', $remark);     
		$remark = strip_tags(stripslashes($remark));
		
		$remark = strip_tags($remark);		
		$commentdata['comment_remark'] = $remark;
		$commentdata['comment_priority'] = $request->comment_priority;	
		

		// Store service form data in services table.
		DB::table('comments')->where('comment_id', $commentid)->update($commentdata);
				
		// Update service id in service resources table using micro_timestamp
		DB::table('comment_resources')->where('micro_timestamp', $request->micro_timestamp)->update(['comments_id' => $commentid]);

		if($request->is_mobile == 1) {
			$msg = array(array('Error' => '0','result'=>'Comment details updated successfully'));			
			return response()->json(['msg'=>$msg]);
		}
		else {
			return redirect('/comments?unitid='.$request->comment_unit_id)->with('alert','Comment details updated successfully');	
		}
	}

	/**
	* Remove the specified resource from storage.
	*
	* @param  \App\Service  $Service
	* @return \Illuminate\Http\Response
	*/
	public function delete($id, $ismobile)
	{
		$comment = DB::table('comments')->where('comment_id', $id)->update(['comment_status' => '1']);		
		DB::table('eventorcomments')->where('event_type','C')->where('type_table_id',$id)->delete();
		DB::table('comment_resources')->where('comments_id',$id)->delete();
		if($ismobile == 0)
			return redirect('/comments');
		else {
			$msg = array(array('Error' => '0','result'=>'Comment details deleted successfully'));
			return response()->json(['msg'=>$msg]);
		}
	}

	// upload service resources
	public function uploadcommentresources(Request $request)
	{
		if(!empty($_FILES)) 
		{           
			$file = Input::file('file');
			$destinationPath = public_path().'/commentimages';     
			$timestamp = str_replace([' ', ':'], '-', date("YmdHis"));
			$filename = $timestamp."_123_".$file->getClientOriginalName();
			if(Input::file('file')->move($destinationPath, $filename)) {
				$microtimestamp = $request->microtimestamp;
				DB::table('comment_resources')->insert(['comment_resource' => $filename,'micro_timestamp' => $microtimestamp]);
				return Response::json('success', 200);
			} else {
				return Response::json('error', 400);
			}
		} 
	}

	// remove resource from service resources table - for web
	public function removecommentresource(Request $request)
	{
		$resourceid = $request->resourceid;
		$resource = '_'.$request->resourcefile;
		$microtimestamp = $request->microtimestamp;
		if($resourceid > 0)
			$resources = DB::table('comment_resources')->where('comment_resource_id', $resourceid)->get();
		else
			$resources = DB::table('comment_resources')->where('micro_timestamp', $microtimestamp)->where('comment_resource', 'LIKE', "%$resource%")->get();
		if(count($resources) > 0)
		{
			$filename = public_path().'/commentimages/'.$resources[0]->comment_resource;
			DB::table('comment_resources')->where('comment_resource_id', $resources[0]->comment_resource_id)->delete();
			if(file_exists($filename))
				unlink($filename);
		}
	}

	public function removecommentresources($resourceid)
	{
		$resources = DB::table('comment_resources')->where('comment_resource_id', $resourceid)->get();
		if(count($resources) > 0)
		{
			$filename = public_path().'/commentimages/'.$resources[0]->service_resource;
			DB::table('comment_resources')->where('comment_resource_id', $resourceid)->delete();			
			if(file_exists($filename))
				unlink($filename);
		}		
	}	
}
