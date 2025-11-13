import Navbar from "../components/homePage/Navbar";
import { ArrowRight, BarChart3, Calendar, CheckCircle2, MessageSquare, Shield, Star, Users, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home(){
  return(
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-50">
        {/* Navigation */}
        <Navbar/>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  🚀 專案管理的全新體驗
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                  讓專案管理
                  <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    {" "}更簡單高效
                  </span>
                </h1>
                <p className="text-xl text-gray-600">
                  Tracklo 結合看板管理與智慧追蹤，幫助團隊輕鬆掌握每個專案進度，提升協作效率，讓工作流程更順暢。
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white text-lg h-14">
                    立即開始免費試用
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 text-lg h-14">
                    觀看示範影片
                  </Button>
                </div>
                <div className="flex items-center space-x-6 pt-4">
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-green-400 border-2 border-white" />
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                    </div>
                    <p className="mt-1">超過 <span className="font-semibold text-blue-600">10,000+</span> 團隊信賴使用</p>
                  </div>
                </div>
              </div>

              {/* Product Screenshot Placeholder */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-green-400 rounded-2xl blur-3xl opacity-30"></div>
                <div className="relative bg-white rounded-2xl shadow-2xl border-4 border-blue-100 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-green-500 h-8 flex items-center px-4 space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="p-8 bg-gradient-to-br from-gray-50 to-blue-50 h-96 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-200 to-green-200 rounded-xl flex items-center justify-center">
                        <BarChart3 className="w-12 h-12 text-blue-600" />
                      </div>
                      <p className="text-gray-500 font-medium">系統操作介面截圖</p>
                      <p className="text-sm text-gray-400">展示看板、任務卡片、進度追蹤</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">強大功能，一應俱全</h2>
              <p className="text-xl text-gray-600">專為現代團隊打造的專案管理工具</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-2 border-blue-100 hover:border-blue-300 transition hover:shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">視覺化看板管理</h3>
                  <p className="text-gray-600">
                    類似 Trello 的直覺式看板介面，輕鬆拖拉卡片，即時更新任務狀態，讓專案進度一目了然。
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-100 hover:border-green-300 transition hover:shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">團隊協作無縫接軌</h3>
                  <p className="text-gray-600">
                    即時通知、評論討論、檔案共享，讓團隊成員隨時保持同步，提升溝通效率。
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-100 hover:border-blue-300 transition hover:shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-green-500 rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">智慧進度追蹤</h3>
                  <p className="text-gray-600">
                    自動計算專案完成度，生成可視化報表，掌握團隊績效與時程控制。
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-100 hover:border-green-300 transition hover:shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-blue-500 rounded-xl flex items-center justify-center">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">自動化工作流程</h3>
                  <p className="text-gray-600">
                    設定觸發條件自動執行動作，減少重複性工作，讓團隊專注於重要任務。
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-100 hover:border-blue-300 transition hover:shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-green-600 rounded-xl flex items-center justify-center">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">時程管理整合</h3>
                  <p className="text-gray-600">
                    內建甘特圖與行事曆檢視，清楚掌握專案時間軸，避免延遲與衝突。
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-100 hover:border-green-300 transition hover:shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">企業級安全保障</h3>
                  <p className="text-gray-600">
                    多層加密保護、權限控制、定期備份，確保您的專案資料安全無虞。
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 px-4 bg-gradient-to-br from-blue-50 to-green-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">三步驟開始使用</h2>
              <p className="text-xl text-gray-600">簡單快速，立即提升團隊效率</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    1
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">建立專案看板</h3>
                    <p className="text-gray-600">
                      快速建立新專案，自訂看板欄位（如：待辦、進行中、已完成），設定團隊成員與權限。
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    2
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">新增任務卡片</h3>
                    <p className="text-gray-600">
                      建立任務卡片，設定負責人、截止日期、優先順序、標籤等資訊，並附加相關檔案與清單。
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    3
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">追蹤與協作</h3>
                    <p className="text-gray-600">
                      拖曳卡片更新狀態，團隊成員即時留言討論，系統自動追蹤進度並生成報表分析。
                    </p>
                  </div>
                </div>
              </div>

              {/* Workflow Screenshot Placeholder */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-400 rounded-2xl blur-3xl opacity-30"></div>
                <div className="relative bg-white rounded-2xl shadow-2xl border-4 border-green-100 overflow-hidden">
                  <div className="bg-gradient-to-r from-green-500 to-blue-500 h-8 flex items-center px-4 space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="p-8 bg-gradient-to-br from-gray-50 to-green-50 h-96 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-200 to-blue-200 rounded-xl flex items-center justify-center">
                        <MessageSquare className="w-12 h-12 text-green-600" />
                      </div>
                      <p className="text-gray-500 font-medium">工作流程示意圖</p>
                      <p className="text-sm text-gray-400">展示任務建立、拖拉、協作流程</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">選擇適合的方案</h2>
              <p className="text-xl text-gray-600">彈性方案，滿足不同規模團隊需求</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="border-2 border-gray-200 hover:shadow-lg transition">
                <CardContent className="p-8 space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">免費版</h3>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-gray-900">$0</span>
                      <span className="text-gray-600">/月</span>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">最多 3 個專案看板</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">5 位團隊成員</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">基本任務管理</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">100MB 儲存空間</span>
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full border-2 border-blue-500 text-blue-600 hover:bg-blue-50">
                    開始使用
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-4 border-blue-500 hover:shadow-2xl transition relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    最受歡迎
                  </span>
                </div>
                <CardContent className="p-8 space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">專業版</h3>
                    <div className="mt-4">
                      <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">$299</span>
                      <span className="text-gray-600">/月</span>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">無限專案看板</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">20 位團隊成員</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">進階分析報表</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">50GB 儲存空間</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">自動化工作流程</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">優先客戶支援</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                    開始免費試用
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-gray-200 hover:shadow-lg transition">
                <CardContent className="p-8 space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">企業版</h3>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-gray-900">客製</span>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">無限專案與成員</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">客製化功能開發</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">專屬客戶經理</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">無限儲存空間</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">進階安全性設定</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">SLA 服務保證</span>
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                    聯繫我們
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-green-600">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              準備好提升團隊效率了嗎？
            </h2>
            <p className="text-xl text-blue-100">
              立即開始 14 天免費試用，無需信用卡，隨時可取消
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg h-14 px-8">
                免費試用 14 天
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-lg h-14 px-8">
                預約產品展示
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                    Logo
                  </div>
                  <span className="text-xl font-bold text-white">Tracklo</span>
                </div>
                <p className="text-sm">讓專案管理更簡單高效的專業工具</p>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-4">產品</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white transition">功能特色</a></li>
                  <li><a href="#" className="hover:text-white transition">方案價格</a></li>
                  <li><a href="#" className="hover:text-white transition">企業方案</a></li>
                  <li><a href="#" className="hover:text-white transition">更新日誌</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-4">資源</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white transition">使用指南</a></li>
                  <li><a href="#" className="hover:text-white transition">API 文件</a></li>
                  <li><a href="#" className="hover:text-white transition">部落格</a></li>
                  <li><a href="#" className="hover:text-white transition">常見問題</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-4">公司</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white transition">關於我們</a></li>
                  <li><a href="#" className="hover:text-white transition">聯絡我們</a></li>
                  <li><a href="#" className="hover:text-white transition">隱私政策</a></li>
                  <li><a href="#" className="hover:text-white transition">服務條款</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm">© 2025 Tracklo. 版權所有。</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-white transition">Facebook</a>
                <a href="#" className="hover:text-white transition">Twitter</a>
                <a href="#" className="hover:text-white transition">LinkedIn</a>
                <a href="#" className="hover:text-white transition">Instagram</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}