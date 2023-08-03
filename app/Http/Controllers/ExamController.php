<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class ExamController extends Controller
{
      /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = User::all();
        // dd(response()->json($data))
        return response()->json($data);
    }

    public function show($id)
    {
       // User Detail
       $users = User::find($id);
       if(!$users){
         return response()->json([
            'message'=>'User Not Found.'
         ],404);
       }

       // Return Json Response
       return response()->json([
          'users' => $users
       ],200);
    }

    public function store(Request $request){
        try {
            // dd($request->all());
            // Create User
            User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password'  => bcrypt('123'),
            ]);
            // Return Json Response
            return response()->json([
                'message' => "User successfully created."
            ],200);
        } catch (\Exception $e) {
            // Return Json Response
            return response()->json([
                'message' => $e->getMessage(),
            ],500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            // Find User
            $users = User::find($id);
            if(!$users){
              return users()->json([
                'message'=>'User Not Found.'
              ],404);
            }

            //echo "request : $request->image";
            $users->name = $request->name;
            $users->email = $request->email;

            // Update User
            $users->save();

            // Return Json Response
            return response()->json([
                'message' => "User successfully updated."
            ],200);
        } catch (\Exception $e) {
            // Return Json Response
            return response()->json([
                'message' => "Something went really wrong!"
            ],500);
        }
    }

    public function destroy($id)
    {
        // Detail
        $users = User::find($id);
        if(!$users){
          return response()->json([
             'message'=>'User Not Found.'
          ],404);
        }

        // Delete User
        $users->delete();

        // Return Json Response
        return response()->json([
            'message' => "User successfully deleted."
        ],200);
    }
}
