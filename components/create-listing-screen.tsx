'use client'

import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { createListing, type ListingPayload } from '@/lib/api'
import { FoodTile } from './food-tile'
import { useNav } from './navigation'
import { useToast } from './toast'

type ListingType = 'Daily Drop' | 'Surplus Box'

const FIELD_LABEL =
  'text-[12px] uppercase tracking-[0.4px]'

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <label className="flex flex-1 flex-col gap-1.5">
      <span
        className={FIELD_LABEL}
        style={{ color: 'var(--color-muted)', fontWeight: 700 }}
      >
        {label}
      </span>
      {children}
    </label>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '13px 15px',
  border: '1px solid var(--color-border)',
  borderRadius: 13,
  fontSize: 15,
  backgroundColor: '#fff',
  fontWeight: 500,
  color: 'var(--color-ink)',
}

export function CreateListingScreen() {
  const { navigate } = useNav()
  const { showToast } = useToast()

  const [type, setType] = useState<ListingType>('Daily Drop')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [originalPrice, setOriginalPrice] = useState('')
  const [salePrice, setSalePrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [openingTime, setOpeningTime] = useState('')
  const [pickupFrom, setPickupFrom] = useState('')
  const [pickupUntil, setPickupUntil] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const qtyNum = Number.parseInt(quantity, 10)
  const saleNum = Number.parseFloat(salePrice)
  const origNum = Number.parseFloat(originalPrice)

  async function handlePublish(e: React.FormEvent) {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    const payload: ListingPayload = {
      type,
      item: name,
      description,
      originalPrice: Number.isFinite(origNum) ? origNum : 0,
      salePrice: Number.isFinite(saleNum) ? saleNum : 0,
      quantity: Number.isFinite(qtyNum) ? qtyNum : 0,
    }
    await createListing(payload)
    // reset form
    setName('')
    setDescription('')
    setOriginalPrice('')
    setSalePrice('')
    setQuantity('')
    setOpeningTime('')
    setPickupFrom('')
    setPickupUntil('')
    setSubmitting(false)
    showToast('Listing published and live nearby')
    navigate('merchant')
  }

  return (
    <main className="mx-auto w-full max-w-[1000px] flex-1" style={{ padding: '30px 24px 44px' }}>
      <button
        type="button"
        onClick={() => navigate('merchant')}
        className="flex items-center gap-1.5 text-[14px]"
        style={{ color: 'var(--color-muted)', fontWeight: 700 }}
      >
        <ArrowLeft size={17} strokeWidth={2.4} />
        Back to dashboard
      </button>

      <h1
        className="font-heading mt-4 text-[34px] leading-none"
        style={{ fontWeight: 800, letterSpacing: '-1px' }}
      >
        New listing
      </h1>

      <div
        className="mt-6 grid gap-7"
        style={{ gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 0.75fr)' }}
      >
        {/* Form */}
        <form
          onSubmit={handlePublish}
          className="bg-white"
          style={{ border: '1px solid var(--color-border)', borderRadius: 22, padding: '26px 28px' }}
        >
          {/* Type segmented control */}
          <div
            className="flex rounded-full p-1"
            style={{ backgroundColor: 'var(--color-warm-chip)' }}
          >
            {(['Daily Drop', 'Surplus Box'] as ListingType[]).map((t) => {
              const sel = type === t
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className="flex-1 rounded-full px-4 py-2 text-[13px] font-bold transition-colors"
                  style={{
                    backgroundColor: sel ? 'var(--color-ink)' : 'transparent',
                    color: sel ? '#fff' : 'var(--color-muted)',
                  }}
                >
                  {t}
                </button>
              )
            })}
          </div>

          <div className="mt-5 flex flex-col gap-4">
            <Field label="Item name">
              <input
                style={inputStyle}
                placeholder="Almond Croissant"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Field>

            <Field label="Description">
              <textarea
                style={{ ...inputStyle, minHeight: 92, resize: 'vertical' }}
                placeholder="A surprise mix of this morning's surplus bakes."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Field>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Field label="Original price">
                <input
                  style={inputStyle}
                  inputMode="decimal"
                  placeholder="$6.50"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                />
              </Field>
              <Field label="Sale price">
                <input
                  style={inputStyle}
                  inputMode="decimal"
                  placeholder="$1.99"
                  value={salePrice}
                  onChange={(e) => setSalePrice(e.target.value)}
                />
              </Field>
              <Field label="Quantity">
                <input
                  style={inputStyle}
                  inputMode="numeric"
                  placeholder="8"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </Field>
            </div>

            {/* Conditional timing */}
            {type === 'Daily Drop' ? (
              <Field label="Opening time">
                <input
                  style={inputStyle}
                  placeholder="5 pm"
                  value={openingTime}
                  onChange={(e) => setOpeningTime(e.target.value)}
                />
                <span className="mt-1 text-[12px]" style={{ color: 'var(--color-muted)' }}>
                  The claim button stays locked for everyone until this exact time.
                </span>
              </Field>
            ) : (
              <div className="flex flex-col gap-4 sm:flex-row">
                <Field label="Pickup from">
                  <input
                    style={inputStyle}
                    placeholder="5 pm"
                    value={pickupFrom}
                    onChange={(e) => setPickupFrom(e.target.value)}
                  />
                </Field>
                <Field label="Pickup until">
                  <input
                    style={inputStyle}
                    placeholder="7 pm"
                    value={pickupUntil}
                    onChange={(e) => setPickupUntil(e.target.value)}
                  />
                </Field>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-1 w-full rounded-[13px] py-3.5 text-[15px] text-white"
              style={{
                backgroundColor: 'var(--color-primary)',
                fontWeight: 700,
                boxShadow: '0 8px 18px rgba(255,106,43,.32)',
                cursor: submitting ? 'not-allowed' : 'pointer',
                opacity: submitting ? 0.7 : 1,
              }}
            >
              Publish listing
            </button>
          </div>
        </form>

        {/* Live preview */}
        <div>
          <span
            className="text-[12px] uppercase tracking-[0.4px]"
            style={{ color: 'var(--color-muted)', fontWeight: 700 }}
          >
            Live preview
          </span>

          <div
            className="mt-2 flex flex-col overflow-hidden bg-white"
            style={{ border: '1px solid var(--color-border)', borderRadius: 22 }}
          >
            <FoodTile cuisine="Bakery" height={150}>
              <span
                className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] uppercase tracking-wide"
                style={{
                  backgroundColor:
                    type === 'Daily Drop' ? 'var(--color-berry)' : 'var(--color-success)',
                  color: '#fff',
                  fontWeight: 800,
                }}
              >
                {type}
              </span>
            </FoodTile>

            <div className="flex flex-col px-4 pb-4 pt-3.5">
              <p className="text-[17px]" style={{ fontWeight: 800 }}>
                {name.trim() || 'Item name'}
              </p>
              <p
                className="mt-1 text-[13px] leading-relaxed"
                style={{ color: 'var(--color-muted)' }}
              >
                {description.trim() || 'Your description will appear here.'}
              </p>

              <div className="mt-3 flex items-baseline gap-2">
                <span
                  className="font-heading text-[22px]"
                  style={{ fontWeight: 800, color: 'var(--color-primary)' }}
                >
                  {Number.isFinite(saleNum) ? `$${saleNum.toFixed(2)}` : '$0.00'}
                </span>
                {Number.isFinite(origNum) && origNum > 0 ? (
                  <span
                    className="text-[14px] line-through"
                    style={{ color: 'var(--color-muted)' }}
                  >
                    ${origNum.toFixed(2)}
                  </span>
                ) : null}
              </div>

              <span className="mt-2 text-[13px]" style={{ color: 'var(--color-muted)', fontWeight: 600 }}>
                {Number.isFinite(qtyNum) && qtyNum > 0 ? qtyNum : 0} available
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
