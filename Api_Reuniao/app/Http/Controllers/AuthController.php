<?php

namespace App\Http\Controllers;

use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return User::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function getUserName($userName)
    {
        $user = User::select('userName')->where('userName', $userName)->first();

        return (isset($user)) ? ['exists' => true] : ['exists' => false];
    }

    public function getEmail($email)
    {
        $user = User::select('email')->where('email', $email)->first();

        return (isset($user)) ? ['exists' => true] : ['exists' => false];
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'userName' => 'required|string|unique:users,username',
            'email' => 'required|string|email|unique:users,email',
            'ramal' => 'required',
            'nivelPermissao' => 'required',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = new User();
        $user->name = $request->input('name');
        $user->username = $request->input('userName');
        $user->email = $request->input('email');
        $user->ramal = $request->input('ramal');
        $user->nivelPermissao = $request->input('nivelPermissao');
        $user->password = Hash::make($request->input('password'));
        $user->save();

        $token = $user->createToken('API Token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ], 201);

    }

    public function resetSenha(Request $request){
        try {
            $usuario = User::where('userName', $request->userName)->first();
        
            if (!$usuario) {
                return ['error' => 'Usuário não encontrado'];
            }
        
            $usuario->password = Hash::make('marinha');
            $usuario->save();
        
            return ['success' => true];
        } catch (\Exception $error) {
            return ['error' => $error->getMessage()];
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::all()->where('id', $id)->first();

        return $user;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try{
            $usuario = User::find($id);

            $usuario->name = $request->name;
            $usuario->userName = $request->userName;
            $usuario->email = $request->email;
            $usuario->ramal = $request->ramal;
            $usuario->nivelPermissao = $request->nivelPermissao;

            $usuario->update();

            return ['sucess'=> true];
        }catch(\Exception $error){
            return ['error' => $error];
        }
    }

    /**
     * Update user's password.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateSenha(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'current_password' => ['required', 'string'],
            'password' => ['required', 'string', 'confirmed', 'min:8'],
        ], [
            'current_password.required' => __('The current password field is required.'),
            'password.confirmed' => __('The password confirmation does not match.'),
            'password.min' => __('The password must be at least 8 characters.'),
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = $request->user();

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['error' => __('The provided password does not match your current password.')], 422);
        }

        $user->forceFill([
            'password' => Hash::make($request->password),
        ])->save();

        return response()->json(['message' => __('Password updated successfully!')], 200);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::find($id);
        $user->delete();
    }
    
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'userName' => 'required|string|exists:users,userName',
            'password' => 'required|string',
        ]);

        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Credenciais inválidas'], 401);
        }

        $user = $request->user();
        $token = $user->createToken('TokenName')->plainTextToken;

        return response()->json(['token' => $token, 'user' => $user]);
    }
    public function logout(Request $request)
    {
        if ($request->user()) {
            $request->user()->currentAccessToken()->delete();
        }

        return response()->json(['message' => 'Usuário deslogado com sucesso']);
    }
}
