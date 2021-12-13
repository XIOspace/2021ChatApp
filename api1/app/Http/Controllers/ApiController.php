<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ApiController extends Controller
{
    public function user(Request $req){
        // dd($res->user());

        // dd($req->user()->id);


        return [
			'name'=> $req->user()->name,
			'id' => $req->user()->id
			];
    }
    //
    public function userlogin(Request $req,\App\User $user){
        // return['name'=>'xxx'];



        $userName=$req->userName;
        $userPasswd=$req->userPasswd;
        // $res=$req->user->where([
        //     'name'=>'qq1954556630@gmail.com'
        // ])-> select()-> toArray();





        // $res=$req->user->where('name', 'qq1954556630@gmail.com')->first();

        // return $res;

        // return['name'=>$req->userName];

        // dd($req->userName);


        $res = $user->where('name',$userName)->first();

		if(password_verify($userPasswd,$res['password'])){

			return $res;

		}

		return [];
    }
}
