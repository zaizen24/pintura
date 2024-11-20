import React from 'react'

const LoginPage = () => {
  return (
    <div class="flex w-full">
                    <div class="w-1/2 flex items-center justify-center">
                        <img src="https://placehold.co/400x400" alt="Illustration of a person running" class="w-3/4"/>
                    </div>
                    <div class="w-1/2 flex flex-col justify-center p-8">
                        <button class="flex items-center text-blue-700 mb-8">
                            <i class="fas fa-arrow-left mr-2"></i> Back
                        </button>
                        <h1 class="text-4xl font-bold text-blue-700 mb-2">Welcome Back</h1>
                        <p class="text-gray-600 mb-6">Enter your email and password below to log into your account.</p>
                        <form class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Email</label>
                                <div class="mt-1 relative rounded-md shadow-sm">
                                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <i class="fas fa-envelope text-gray-400"></i>
                                    </div>
                                    <input type="email" class="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md" placeholder="Email"/>
                                </div>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Password</label>
                                <div class="mt-1 relative rounded-md shadow-sm">
                                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <i class="fas fa-lock text-gray-400"></i>
                                    </div>
                                    <input type="password" class="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md" placeholder="Password"/>
                                </div>
                            </div>
                            <div class="flex items-center justify-between">
                                <div class="flex items-center">
                                    <input id="remember_me" name="remember_me" type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"/>
                                    <label for="remember_me" class="ml-2 block text-sm text-gray-900">Remember me</label>
                                </div>
                                <div class="text-sm">
                                    <a href="#" class="font-medium text-blue-600 hover:text-blue-500">Forgot Password?</a>
                                </div>
                            </div>
                            <div>
                                <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Login</button>
                            </div>
                        </form>
                        <div class="mt-6 relative">
                            <div class="absolute inset-0 flex items-center">
                                <div class="w-full border-t border-gray-300"></div>
                            </div>
                            <div class="relative flex justify-center text-sm">
                                <span class="px-2 bg-white text-gray-500">Or</span>
                            </div>
                        </div>
                        <div class="mt-6">
                            <button class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                <img src="https://placehold.co/20x20" alt="Google logo" class="mr-2"/>
                                Sign In With Google
                            </button>
                        </div>
                        <div class="mt-6 text-center">
                            <p class="text-sm text-gray-600">Haven't an Account? <a href="#" class="font-medium text-blue-600 hover:text-blue-500">Register Now.</a></p>
                        </div>
                    </div>
                </div>
  )
}

export default LoginPage
