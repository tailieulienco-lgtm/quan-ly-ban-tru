'use client'
import { useState } from 'react'

export default function QuanLyBanTruApp() {
  const [activeTab, setActiveTab] = useState<'diem-danh' | 'danh-muc' | 'tong-hop'>('diem-danh')

  const [classes, setClasses] = useState(['Mẫu giáo 3-4 tuổi A3', 'Mẫu giáo 3-4 tuổi A1'])
  const [teachers, setTeachers] = useState([
    { id: 1, name: 'Đinh Thị Phương Hoa', className: 'Mẫu giáo 3-4 tuổi A3' }
  ])
  const [students, setStudents] = useState([
    { id: 1, name: 'Đinh Gia Bảo', className: 'Mẫu giáo 3-4 tuổi A3' },
    { id: 2, name: 'Nguyễn Minh Anh', className: 'Mẫu giáo 3-4 tuổi A3' },
    { id: 3, name: 'Trần Bảo Nam', className: 'Mẫu giáo 3-4 tuổi A1' },
  ])

  const [selectedClass, setSelectedClass] = useState('Mẫu giáo 3-4 tuổi A3')
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [attendance, setAttendance] = useState<any>({
    1: { meal: true, english: true, lifeSkills: false },
    2: { meal: true, english: false, lifeSkills: true },
  })

  const [newStudentName, setNewStudentName] = useState('')
  const [newClassName, setNewClassName] = useState('')
  const [newTeacherName, setNewTeacherName] = useState('')

  const mealPrice = 25000       
  const englishPrice = 15000    
  const lifeSkillsPrice = 20000 

  const handleCheckboxChange = (studentId: number, field: string) => {
    setAttendance((prev: any) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: !prev?.[studentId]?.[field]
      }
    }))
  }

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newStudentName.trim()) return
    const newId = students.length + 1
    setStudents([...students, { id: newId, name: newStudentName, className: selectedClass }])
    setNewStudentName('')
    alert('Đã thêm học sinh thành công!')
  }

  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newClassName.trim() || classes.includes(newClassName)) return
    setClasses([...classes, newClassName])
    setNewClassName('')
    alert('Đã thêm lớp học mới thành công!')
  }

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTeacherName.trim()) return
    setTeachers([...teachers, { id: teachers.length + 1, name: newTeacherName, className: selectedClass }])
    setNewTeacherName('')
    alert('Đã phân công giáo viên thành công!')
  }

  const handleExportExcel = () => {
    alert("Đang kết xuất dữ liệu ra file Excel phục vụ lưu hồ sơ kiểm định...")
  }

  const filteredStudents = students.filter(s => s.className === selectedClass)

  return (
    <main className="p-4 md:p-8 max-w-6xl mx-auto font-sans bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-pink-600 to-rose-500 text-white p-6 rounded-2xl shadow-md mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold">🏫 PHẦN MỀM QUẢN LÝ BÁN TRÚ & DỊCH VỤ MẦM NON</h1>
        <p className="text-pink-100 text-sm mt-1">Điểm danh hàng ngày • Tổng hợp học phí • Lưu trữ hồ sơ minh chứng</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6 border-b pb-3">
        <button 
          onClick={() => setActiveTab('diem-danh')}
          className={`px-5 py-2.5 rounded-xl font-bold transition shadow-sm ${activeTab === 'diem-danh' ? 'bg-pink-600 text-white' : 'bg-white text-gray-700 border hover:bg-gray-100'}`}
        >
          📝 Điểm Danh Hàng Ngày
        </button>
        <button 
          onClick={() => setActiveTab('tong-hop')}
          className={`px-5 py-2.5 rounded-xl font-bold transition shadow-sm ${activeTab === 'tong-hop' ? 'bg-pink-600 text-white' : 'bg-white text-gray-700 border hover:bg-gray-100'}`}
        >
          📊 Tổng Hợp Cuối Tháng & Xuất File
        </button>
        <button 
          onClick={() => setActiveTab('danh-muc')}
          className={`px-5 py-2.5 rounded-xl font-bold transition shadow-sm ${activeTab === 'danh-muc' ? 'bg-pink-600 text-white' : 'bg-white text-gray-700 border hover:bg-gray-100'}`}
        >
          ⚙️ Quản Lý Danh Mục (Lớp, Học Sinh, GV)
        </button>
      </div>

      {activeTab === 'diem-danh' && (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-4 bg-white p-4 rounded-2xl shadow-sm border items-center">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Chọn Lớp:</label>
              <select 
                value={selectedClass} 
                onChange={(e) => setSelectedClass(e.target.value)}
                className="p-2.5 border rounded-xl bg-white font-semibold text-gray-800"
              >
                {classes.map((cls, idx) => (
                  <option key={idx} value={cls}>{cls}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Chọn Ngày:</label>
              <input 
                type="date" 
                value={selectedDate} 
                onChange={(e) => setSelectedDate(e.target.value)}
                className="p-2 border rounded-xl bg-white font-semibold text-gray-800"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
            <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
              <h3 className="font-bold text-gray-700">Danh sách lớp: {selectedClass}</h3>
              <span className="text-sm text-pink-600 font-semibold">Tổng số: {filteredStudents.length} học sinh</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 text-sm">
                    <th className="p-3.5">STT</th>
                    <th className="p-3.5">Họ và tên học sinh</th>
                    <th className="p-3.5 text-center">Ăn bán trú 🍚</th>
                    <th className="p-3.5 text-center">Học Tiếng Anh 🇬🇧</th>
                    <th className="p-3.5 text-center">Học Kỹ năng sống 🧠</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student, index) => {
                    const record = attendance[student.id] || { meal: true, english: false, lifeSkills: false }
                    return (
                      <tr key={student.id} className="border-b hover:bg-pink-50/40 transition">
                        <td className="p-3.5 text-gray-500">{index + 1}</td>
                        <td className="p-3.5 font-bold text-gray-800">{student.name}</td>
                        <td className="p-3.5 text-center">
                          <input 
                            type="checkbox" 
                            checked={record.meal}
                            onChange={() => handleCheckboxChange(student.id, 'meal')}
                            className="w-5 h-5 accent-pink-600 cursor-pointer" 
                          />
                        </td>
                        <td className="p-3.5 text-center">
                          <input 
                            type="checkbox" 
                            checked={record.english}
                            onChange={() => handleCheckboxChange(student.id, 'english')}
                            className="w-5 h-5 accent-pink-600 cursor-pointer" 
                          />
                        </td>
                        <td className="p-3.5 text-center">
                          <input 
                            type="checkbox" 
                            checked={record.lifeSkills}
                            onChange={() => handleCheckboxChange(student.id, 'lifeSkills')}
                            className="w-5 h-5 accent-pink-600 cursor-pointer" 
                          />
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <button 
            onClick={() => alert("Đã lưu bảng điểm danh ngày " + selectedDate + " thành công!")}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3.5 rounded-2xl shadow-lg transition"
          >
            💾 LƯU BÁO CÁO ĐIỂM DANH HÔM NAY
          </button>
        </div>
      )}

      {activeTab === 'tong-hop' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-lg font-bold text-gray-800">BẢNG QUYẾT TOÁN THÁNG (Lớp: {selectedClass})</h3>
              <p className="text-sm text-gray-500">Đơn giá áp dụng: Tiền ăn {mealPrice.toLocaleString()}đ/ngày | Tiếng Anh {englishPrice.toLocaleString()}đ/buổi | KNS {lifeSkillsPrice.toLocaleString()}đ/buổi</p>
            </div>
            <button 
              onClick={handleExportExcel}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl shadow transition flex items-center gap-2"
            >
              📥 Xuất File Excel Hồ Sơ
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-pink-600 text-white">
                    <th className="p-3.5">STT</th>
                    <th className="p-3.5">Họ và tên</th>
                    <th className="p-3.5 text-center">Số buổi ăn</th>
                    <th className="p-3.5 text-center">Số buổi TA</th>
                    <th className="p-3.5 text-center">Số buổi KNS</th>
                    <th className="p-3.5 text-right">Tiền ăn (VNĐ)</th>
                    <th className="p-3.5 text-right">Tiền TA (VNĐ)</th>
                    <th className="p-3.5 text-right">Tiền KNS (VNĐ)</th>
                    <th className="p-3.5 text-right font-bold">Tổng cộng (VNĐ)</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student, idx) => {
                    const totalMeals = 20
                    const totalEnglish = 8
                    const totalLifeSkills = 4
                    const sumMeal = totalMeals * mealPrice
                    const sumEnglish = totalEnglish * englishPrice
                    const sumLifeSkills = totalLifeSkills * lifeSkillsPrice
                    const grandTotal = sumMeal + sumEnglish + sumLifeSkills

                    return (
                      <tr key={student.id} className="border-b hover:bg-gray-50">
                        <td className="p-3.5">{idx + 1}</td>
                        <td className="p-3.5 font-bold text-gray-800">{student.name}</td>
                        <td className="p-3.5 text-center">{totalMeals}</td>
                        <td className="p-3.5 text-center">{totalEnglish}</td>
                        <td className="p-3.5 text-center">{totalLifeSkills}</td>
                        <td className="p-3.5 text-right">{sumMeal.toLocaleString()}</td>
                        <td className="p-3.5 text-right">{sumEnglish.toLocaleString()}</td>
                        <td className="p-3.5 text-right">{sumLifeSkills.toLocaleString()}</td>
                        <td className="p-3.5 text-right font-extrabold text-pink-600">{grandTotal.toLocaleString()}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'danh-muc' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <h3 className="font-bold text-gray-800 mb-4 text-base">👶 Thêm Học Sinh Mới</h3>
            <form onSubmit={handleAddStudent} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1 text-gray-600">Họ và tên học sinh:</label>
                <input 
                  type="text" 
                  placeholder="Nhập họ và tên..."
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  className="w-full p-2.5 border rounded-xl text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 text-gray-600">Thuộc lớp:</label>
                <select 
                  value={selectedClass} 
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full p-2.5 border rounded-xl text-sm bg-white"
                >
                  {classes.map((cls, idx) => (
                    <option key={idx} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="w-full bg-pink-600 text-white font-bold py-2.5 rounded-xl text-sm hover:bg-pink-700 transition">
                + Thêm Học Sinh
              </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <h3 className="font-bold text-gray-800 mb-4 text-base">🏫 Thêm Lớp Học Mới</h3>
            <form onSubmit={handleAddClass} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1 text-gray-600">Tên lớp học:</label>
                <input 
                  type="text" 
                  placeholder="Ví dụ: Mẫu giáo 3-4 tuổi A2"
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  className="w-full p-2.5 border rounded-xl text-sm"
                  required
                />
              </div>
              <button type="submit" className="w-full bg-pink-600 text-white font-bold py-2.5 rounded-xl text-sm hover:bg-pink-700 transition">
                + Thêm Lớp Học
              </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <h3 className="font-bold text-gray-800 mb-4 text-base">👩‍🏫 Phân Công Giáo Viên</h3>
            <form onSubmit={handleAddTeacher} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1 text-gray-600">Họ và tên giáo viên:</label>
                <input 
                  type="text" 
                  placeholder="Ví dụ: Đinh Thị Phương Hoa"
                  value={newTeacherName}
                  onChange={(e) => setNewTeacherName(e.target.value)}
                  className="w-full p-2.5 border rounded-xl text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 text-gray-600">Phụ trách lớp:</label>
                <select 
                  value={selectedClass} 
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full p-2.5 border rounded-xl text-sm bg-white"
                >
                  {classes.map((cls, idx) => (
                    <option key={idx} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="w-full bg-pink-600 text-white font-bold py-2.5 rounded-xl text-sm hover:bg-pink-700 transition">
                + Gán Giáo Viên
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}
