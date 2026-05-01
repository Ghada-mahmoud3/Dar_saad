'use client'
import { useState } from 'react'
import Image from 'next/image'

const WINGS = ['الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس']

export default function VillaRentalForm() {
  const [guests, setGuests] = useState(2)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const today = new Date().toISOString().split('T')[0]

  const changeGuests = (d) => setGuests(prev => Math.max(1, Math.min(20, prev + d)))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    const data = new FormData(e.target)
    data.set('guests', guests.toString())
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data })
      const json = await res.json()
      if (json.success) {
        setSuccess(true)
      } else {
        alert('حدث خطأ، يرجى المحاولة لاحقاً')
        setSubmitting(false)
      }
    } catch {
      alert('تعذر الاتصال، تحقق من الإنترنت')
      setSubmitting(false)
    }
  }

  return (
    <>
      <div className="bg-wrap">
        <div className="bg-pattern"></div>
        <div className="bg-glow"></div>
        <div className="bg-glow"></div>
      </div>

      <div className="page">
        {/* Header */}
        <div className="header">
          <div className="logo-wrap">
            <Image src="/logo.png" alt="شعار دار سعد" className="logo-img" width={220} height={220} style={{ borderRadius: '12px' }} />
          </div>
          <h1>طلب استئجار الفيلا الكاملة</h1>
          <p>تجربة إقامة فاخرة في قلب الطبيعة</p>
          <div className="divider"></div>
        </div>

        {/* Form Card */}
        <div className="form-card">
          {!success ? (
            <form onSubmit={handleSubmit}>
              <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_KEY_HERE" />
              <input type="hidden" name="subject" value="طلب استئجار فيلا – دار سعد" />
              <input type="hidden" name="from_name" value="موقع دار سعد" />

              {/* بيانات شخصية */}
              <div className="section-label">البيانات الشخصية</div>
              <div className="grid-2">
                <div className="field">
                  <label><span>*</span> الاسم الكامل</label>
                  <input type="text" name="name" placeholder="محمد عبدالله" required />
                </div>
                <div className="field">
                  <label><span>*</span> رقم الجوال</label>
                  <input type="tel" name="phone" placeholder="+966 5X XXX XXXX" required />
                </div>
              </div>
              <div className="field" style={{ marginTop: '20px' }}>
                <label><span>*</span> البريد الإلكتروني</label>
                <input type="email" name="email" placeholder="example@email.com" required />
              </div>

              {/* الفيلا الكاملة */}
              <div className="section-label">الفيلا الكاملة – ٥ أجنحة متكاملة</div>
              <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                <span className="villa-badge">✦ استئجار الفيلا بالكامل مع جميع الأجنحة ✦</span>
              </div>
              <div className="wings-showcase">
                {WINGS.map((wing, i) => (
                  <div key={i} className="wing-item" style={{ animationDelay: `${(i + 1) * 0.05}s` }}>
                    <div className="wing-check">✓</div>
                    <div className="wing-icon">🏡</div>
                    <div className="wing-name">الجناح {wing}</div>
                  </div>
                ))}
              </div>
              <p className="villa-note">يشمل الحجز الفيلا بجميع أجنحتها الخمسة كوحدة متكاملة</p>
              <input type="hidden" name="wing" value="الفيلا كاملة – ٥ أجنحة" />

              {/* تفاصيل الحجز */}
              <div className="section-label">تفاصيل الحجز</div>
              <div className="grid-2">
                <div className="field">
                  <label><span>*</span> تاريخ الوصول</label>
                  <input type="date" name="check_in" min={today} required />
                </div>
                <div className="field">
                  <label><span>*</span> تاريخ المغادرة</label>
                  <input type="date" name="check_out" min={today} required />
                </div>
              </div>

              <div className="field" style={{ marginTop: '20px' }}>
                <label>عدد الأفراد</label>
                <div className="guests-row">
                  <button type="button" className="guests-btn" onClick={() => changeGuests(-1)}>−</button>
                  <span id="guestCount">{guests}</span>
                  <span className="guest-label">أفراد</span>
                  <button type="button" className="guests-btn" onClick={() => changeGuests(1)}>+</button>
                </div>
              </div>

              <div className="field" style={{ marginTop: '20px' }}>
                <label>مناسبة الزيارة</label>
                <div className="select-wrap">
                  <select name="occasion">
                    <option value="">اختر المناسبة</option>
                    <option>إجازة عائلية</option>
                    <option>مناسبة خاصة</option>
                    <option>تجمع أصدقاء</option>
                    <option>اجتماع عمل</option>
                    <option>شهر العسل</option>
                    <option>أخرى</option>
                  </select>
                </div>
              </div>

              {/* طلبات وملاحظات */}
              <div className="section-label">طلبات وملاحظات</div>
              <div className="field">
                <label>طلبات خاصة أو ملاحظات إضافية</label>
                <textarea name="notes" placeholder="اذكر أي متطلبات خاصة، استفسارات، أو رغبات إضافية..." />
              </div>

              <div className="submit-wrap">
                <button type="submit" className="submit-btn" disabled={submitting}>
                  <span className="btn-icon">✦</span>
                  {submitting ? 'جارٍ الإرسال...' : 'إرسال الطلب'}
                  <span className="btn-icon">✦</span>
                </button>
              </div>

              <div className="api-note">
                ⚙️ لتفعيل الإرسال: أنشئ حساباً مجانياً على <strong>web3forms.com</strong> ثم ضع مفتاحك بدلاً من{' '}
                <code>YOUR_WEB3FORMS_KEY_HERE</code>
              </div>
            </form>
          ) : (
            <div className="success-box">
              <div className="s-icon">✦</div>
              <h2>تم إرسال طلبك بنجاح</h2>
              <p>شكراً لاهتمامك بفيلا دار سعد<br />سيتواصل معك فريقنا خلال 24 ساعة</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
