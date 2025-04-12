  <div className="flex items-center gap-4">
    <div className="w-12 h-12 rounded-full bg-[#F5DC90] flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#6F4C21]">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
      </svg>
    </div>
    <div>
      <p className="font-sans text-[1rem] text-[#6F4C21]">WhatsApp</p>
      <a href={contactoData.redes.find(r => r.nombre === 'WhatsApp').url} className="font-sans text-[1.26rem] text-[#6F4C21] hover:underline">
        {contactoData.telefono}
      </a>
    </div>
  </div> 