"use client"

import { useState } from 'react';
import { Mail, Lock, User, ArrowRight, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from "@radix-ui/themes";
import { InputField, SocialLogin } from '../components';
import ApiServices from '@/api/ApiServices';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
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

  //送出註冊
  const handleSubmit = async () => {
    if(!formData.name || !formData.email || !formData.password){
      toast.warning('請輸入完整註冊資料!');
      return;
    }

    if(formData.password !== formData.confirmPassword){
      toast.error('兩次密碼不一致');
      return;
    }

    try {
      const res = await ApiServices.register(formData.name, formData.email, formData.password);

      if(res.data.success){
        toast.success(res.message);
        router.push('/auth/login')
      }else{
        throw new Error(res.message);
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
            {/* <Image
              src="/Tracklo-logo-removebg-rectangle.png"
              alt="Tracklo Logo"
              width={250}
              height={80}
              className='object-left'
              priority //圖片先載入
            /> */}
            <img 
              src='/Tracklo-logo-removebg-rectangle.png'
              width={200}
              height={80}
            />
          </Link>

          {/* 大標 */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-900 leading-tight">
              開始您的專案管理之旅
            </h1>
            <p className="text-xl text-gray-600">
                加入超過 10,000+ 團隊，體驗更高效的專案管理。
            </p>
          </div>

          {/* 特色field */}
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
          
          {/* 優惠alert */}
          <div className="bg-linear-to-r from-blue-100 to-green-100 rounded-xl p-6 border-2 border-blue-200">
            <p className="text-sm font-medium text-gray-900 mb-2">🎉 限時優惠</p>
            <p className="text-gray-700 text-sm">
              現在註冊即享 <span className="font-bold text-blue-600">14 天免費試用</span>，無需信用卡！
            </p>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <Card className="border-2 border-blue-100 shadow-2xl">
          <CardHeader className="space-y-1 pb-0">
            {/* mobile show logo */}
            <Link href='/' className="md:hidden flex items-center justify-center">
              <img 
                src='/Tracklo-logo-removebg-rectangle.png'
                width={120}
                height={50}
              />
            </Link>
            <CardTitle className="text-2xl font-bold text-center">
              建立帳戶
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-3">
              {/* 註冊時顯示姓名欄位 */}
              <InputField
                label={'姓名'}
                htmlfor={'name'}
                icon={<User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />}
                inputId={'name'}
                inputName={'name'}
                type={'text'}
                placeholder={'請輸入您的姓名'}
                value={formData.name}
                onChange={handleInputChange}
              />

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
                placeholder={'至少 8 個字元'}
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

              {/* 註冊時顯示確認密碼 */}
              <InputField
                label={'確認密碼'}
                htmlfor={'confirmPassword'}
                icon={<Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />}
                inputId={'confirmPassword'}
                inputName={'confirmPassword'}
                type={showPassword ? "text" : "password"}
                placeholder={'請再次輸入密碼'}
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />

              {/* 註冊時顯示條款 */}
              <div className="flex items-start space-x-2">
                <input 
                  type="checkbox" 
                  id="terms" 
                  className="w-4 h-4 mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  我同意 Tracklo 的{' '}
                  <button className="text-blue-600 hover:text-blue-700 font-medium">服務條款</button>
                  {' '}和{' '}
                  <button className="text-blue-600 hover:text-blue-700 font-medium">隱私政策</button>
                </label>
              </div>

              {/* Submit Button */}
              <Button 
                onClick={handleSubmit}
                className="w-full h-12 bg-linear-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-medium text-base"
              >
                開始免費試用
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              {/* Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">或使用以下方式</span>
                </div>
              </div>

              {/* Social Login */}
              <SocialLogin/>

              {/* Toggle between login and signup */}
              <div className="text-center pt-4">
                <p className="text-sm text-gray-600">
                  已經有帳戶了？
                  <Link
                    href='/auth/login'
                    className="ml-1 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    返回登入
                  </Link>
                </p>
              </div>

              {/* © Bottom */}
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  © 2025 Tracklo. 版權所有
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}