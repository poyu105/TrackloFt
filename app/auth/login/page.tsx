"use client"

import { useState } from 'react';
import { Mail, Lock, ArrowRight, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Link } from "@radix-ui/themes";
import { InputField, SocialLogin } from '../components';
import { toast } from 'sonner';
import ApiServices, { setAccessToken } from '@/api/ApiServices';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { login } from '@/store/userSlice';

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    if(!formData.email || !formData.password){
      toast.warning('請輸入電子郵件或密碼');
      return;
    }

    try {
      const res = await ApiServices.login(formData.email, formData.password);
      if(res){
        toast.success(res.message);
        setAccessToken(res.data.accessToken);
        dispatch(
          login({
            userInfo: {
              id: res.data.user.id,
              name: res.data.user.name,
              email: res.data.user.email,
              role: res.data.user.role || "用戶",
            },
            token: res.data.accessToken,
          })
        )
        router.push('/dashboard');
      }
    } catch (error) {
      toast.error(`${error}`);
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden md:block space-y-8">
          {/* Logo */}
          <Link href="/" className="inline-block">
            <img 
              src='/Tracklo-logo-removebg-rectangle.png'
              width={200}
              height={80}
            />
          </Link>

          {/* 大標 */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-900 leading-tight">
              歡迎回來！
            </h1>
            <p className="text-xl text-gray-600">
              登入您的帳戶，繼續管理您的專案與團隊。
            </p>
          </div>

          {/* 功能簡介 */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">視覺化看板管理</h3>
                <p className="text-gray-600 text-sm">直覺式拖拉介面，輕鬆掌握專案進度</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">即時團隊協作</h3>
                <p className="text-gray-600 text-sm">無縫溝通，提升團隊工作效率</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">智慧進度追蹤</h3>
                <p className="text-gray-600 text-sm">自動生成報表，數據驅動決策</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <Card className="border-2 border-blue-100 shadow-2xl">
          <CardHeader className="space-y-1 pb-6">
            {/* mobile show logo */}
            <Link href='/' className="md:hidden flex items-center justify-center">
              <img 
                src='/Tracklo-logo-removebg-rectangle.png'
                width={120}
                height={50}
              />
            </Link>
            <CardTitle className="text-2xl font-bold text-center">
              登入帳戶
            </CardTitle>
            <CardDescription className="text-center">
              使用您的電子郵件登入
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {/* Email */}
              <InputField
                label={'電子郵件'}
                htmlfor={'email'}
                icon={<Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />}
                inputId={'email'}
                inputName={'email'}
                type={'email'}
                placeholder={'name@example.com'}
                value={formData.email}
                onChange={handleInputChange}
              />

              {/* Password */}
              <InputField
                label={'密碼'}
                htmlfor={'password'}
                icon={<Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />}
                inputId={'password'}
                inputName={'password'}
                type={showPassword ? "text" : "password"}
                placeholder={'請輸入密碼'}
                value={formData.password}
                onChange={handleInputChange}
                eye={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                }
              />

              {/* 登入時顯示忘記密碼 */}
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm text-gray-600">記住我</span>
                </label>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  忘記密碼？
                </button>
              </div>

              {/* Submit Button */}
              <Button 
                onClick={handleSubmit}
                className="w-full h-12 bg-linear-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-medium text-base"
              >
                登入
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">或使用以下方式</span>
                </div>
              </div>

              {/* Social Login */}
              <SocialLogin />

              {/* Toggle between login and signup */}
              <div className="text-center pt-4">
                <p className="text-sm text-gray-600">
                  還沒有帳戶？
                  <Link
                    href='/auth/register'
                    className="ml-1 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    立即註冊
                  </Link>
                </p>
              </div>
            </div>
            
            {/* © Bottom */}
            <div className="text-center">
              <p className="text-sm text-gray-500">
                © 2025 Tracklo. 版權所有
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}