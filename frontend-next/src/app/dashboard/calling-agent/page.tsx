'use client';

import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useState, useEffect, useCallback } from 'react';
import {
  getCallSchedules, scheduleCall, cancelCallSchedule,
  triggerOutboundCall, getCallLogs,
  type CallSchedule, type CallLog,
} from '@/lib/api';

export default function CallingAgentPage() {
  const [schedules, setSchedules] = useState<CallSchedule[]>([]);
  const [callLogs, setCallLogs] = useState<CallLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [showImmediateCall, setShowImmediateCall] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);

  const [formData, setFormData] = useState({
    phone_number: '', call_type: 'daily_summary', frequency: 'daily',
    first_call_at: '', asset: '', time'use client';

import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import {e 
import Cardupdimport Button from '@/components/ui/Butedimport { useState, useEffect, useCallback }stimport {
  getCallSchedules, scheduleCall, cancelCallSchnc  getCa{
  triggerOutboundCall, getCallLogs,
  type CallSched    type CallSchedule, type CallLog,aw} from '@/lib/api';

export defauSc
export default fuLog  const [schedules, setSchedules] = useStatRe  const [callLogs, setCallLogs] = useState<CallLog[]>([]);
  con c  const [loading, setLoading] = useState(true);
  const [o   const [error, setError] = useState('');
  co);  const [showCreate, setShowCreate] = ustc  const [showImmediateCall, setSst handleSchedule = asy  const [createLoading, setCreateLoading] = useState(false);

  cont)
  const [formData, setFormData] = useState({
    phone_numrea    phone_number: '', call_type: 'daily_sumdu    first_call_at: '', asset: '', time'use client';

import Card froDa
import Card from '@/components/ui/Card';
import Birsimport Button from '@/components/ui/Butcaimport {e 
import Cardupdimport Button fromncimport Ca    getCallSchedules, scheduleCall, cancelCallSchnc  getCa{
  triggerOutboundCall, getCallLogs,
  type CallSce)  triggerOutboundCall, getCallLogs,
  type CallSched    y_  type CallSched    type CallSchedt_
export defauSc
export default fuLog  const [schedules, setSchedules] = ch export defaul    con c  const [loading, setLoading] = useState(true);
  const [o   const [error, setError] = useState('');
  co);  const d:  const [o   const [error, setError] = useState('');
')  co);  const [showCreate, setShowCreate] =e(schedule
  cont)
  const [formData, setFormData] = useState({
    phone_numrea    phone_number: '', call_type: 'daily_sumdu    first_call_at: '', asset: '', time'use clie nu  conseq    phone_numrea    phone_number: '', call_ul
import Card froDa
import Card from '@/components/ui/Card';
import Birsimport Button from '@/components/ui/Butcer:import Card fromhoimport Birsimport Button from '@/compontaimport Cardupdimport Button fromncimport Ca    getCallSchedulim  triggerOutboundCall, getCallLogs,
  type CallSce)  triggerOutboundCall, getCallLogs,
  type CallScpon  type CallSce)  triggerOutboundCapo  type CallSched    y_  type CallSched    type Cacaexport defauSc
export default fuLog  const [scor: ${err.mesexport defa  }
  const [o   const [error, setError] = useState('');
  co);  const d:  const [o   const [error, setError] = useState('');
')  c m  co);  const d:  const [o   const [error, setError A')  co);  const [showCreate, setShowCreate] =e(schedule
  cont)
  crs  cont)
  const [formData, setFormData] = useState({
 ,   ccript    phone_numrea    phone_number: '', call_poimport Card froDa
import Card from '@/components/ui/Card';
import Birsimport Button from '@/components/ui/Butcer:import Card fromhoimport Birsimport Button from '@f import Card from (import Birsimport Button from '@/componju  type CallSce)  triggerOutboundCall, getCallLogs,
  type CallScpon  type CallSce)  triggerOutboundCapo  type CallSched    y_  type CallSched    type Cacaexport defauSc
export default fuLog  const rcase">Loading   type CallScpon  type CallSce)  triggerOutboundC

export default fuLog  const [scor: ${err.mesexport defa  }
  const [o   const [error, setError] = useState('');
  cobo  const [o   const [error, setError] = useState('');
  coer  co);  const d:  const [o   const [error, setErrorut')  c m  co);  const d:  const [o   const [error, setError A')  co)    cont)
  crs  cont)
  const [formData, setFormData] = useState({
 ,   ccript    phone_numrea    phone_number: '',am  crs t-  const [fold ,   ccript    phone_numrea    phone_number <import Card from '@/components/ui/Card';
import Birsimport Button from 'ALimport Birsimport Button from '@/componnC  type CallScpon  type CallSce)  triggerOutboundCapo  type CallSched    y_  type CallSched    type Cacaexport defauSc
export default fuLog  const rcase">Loading   type CallScpon  type Calborder-black pb-3">Two-Way Caexport default fuLog  const rcase">Loading   type CallScpon  type CallSce)  triggerOutboundC

export default fuLog    
export default fuLog  const [scor: ${err.mesexport defa  }
  const [o   const [error, setEt-b  const [o   const [error, setError] = useState('');
  coss  cobo  const [o   const [error, setError] = useStadi  coer  co);  const d:  const [o   const [error, setErrorAc  crs  cont)
  const [formData, setFormData] = useState({
 ,   ccript    phone_numrea    phone_number: '',am  crs t-  const [fold ,       cons{schedu ,   ccript    phone_numrea    phone_numberamimport Birsimport Button from 'ALimport Birsimport Button from '@/componnC  type CallScpon  type CallSce)  triggerOutboundCapo  type CallSched    y_  type e export default fuLog  const rcase">Loading   type CallScpon  type Calborder-black pb-3">Two-Way Caexport default fuLog  const rcase">Loading   type CallScpon  type CallSce)  triggerOutboundC  
export default fuLog    
export default fuLog  const [scor: ${err.mesexport defa  }
  const [o   const [error, setEt-b  const [o   const [error, setError] = useState('');
  coss  cobo  con   export default fuLog  ">
  const [o   const [error, setEt-b  const [o   const [err-3  coss  cobo  const [o   const [error, setError] = useStadi  coer  co);  const d:  coal  const [formData, setFormData] = useState({
 ,   ccript    phone_numrea    phone_number: '',am  crs t-  const [fold ,       consul ,   ccript    phone_numrea    phone_numbere export default fuLog    
export default fuLog  const [scor: ${err.mesexport defa  }
  const [o   const [error, setEt-b  const [o   const [error, setError] = useState('');
  coss  cobo  con   export default fuLog  ">
  const [o   const [error, setEt-b  const [o   const [err-3  coss  cobo  const [o   const [error, setError] = useStadi  coer  co);  const d:  coal  const [formData, setFormData] = useState({
 ,   ccript    phone_numrea    phone_number: '',am  crs t-  const [fold ,     {export default fuLog  c<s  const [o   const [error, setEt-b  const [o   const [err/d  coss  cobo  con   export default fuLog  ">
  const [o   const [error, setEt-b  cons    const  <div className="border-t-4 border-bl ,   ccript    phone_numrea    phone_number: '',am  crs t-  const [fold ,       consul ,   ccript    phone_numrea    phone_numbere export default fuLog    
export default fuLog  const [scorchexport default fuLog  const [scor: ${err.mesexport defa  }
  const [o   const [error, setEt-b  const [o   const [error, setError] = useState('');
  coss  .l  const [o   const [error, setEt-b  const [o   const [erreS  coss  cobo  con   export default fuLog  ">
  const [o   const [error, setEt-b  cons    const [o   const [error, setEt-b  const [   ,   ccript    phone_numrea    phone_number: '',am  crs t-  const [fold ,     {export default fuLog  c<s  const [o   const [error, setEt-b  const [o   const [err/d  coss  cobo  con   export    const [o   const [error, setEt-b  cons    const  <div className="border-t-4 border-bl ,   ccript    phone_numrea    phone_number: '',am  crs t-  const [fold ,       consul ,   ccript    phone_numrea    phenexport default fuLog  const [scorchexport default fuLog  const [scor: ${err.mesexport defa  }
  const [o   const [error, setEt-b  const [o   const [error, setError] = useState('');
  coss  .l  const [o   const [error, setEt-b  const [o   cong.  const [o   const [error, setEt-b  const [o   const [error, setError] = useState('');
  cos-b  coss  .l  const [o   const [error, setEt-b  const [o   const [erreS  coss  cobo  co"f  const [o   const [error, setEt-b  cons    const [o   const [error, setEt-b  const [   ,   ccript    phone_numrne  const [o   const [error, setEt-b  const [o   const [error, setError] = useState('');
  coss  .l  const [o   const [error, setEt-b  const [o   cong.  const [o   const [error, setEt-b  const [o   const [error, setError] = useState('');
  cos-b  coss  .l  const [o   const [error, setEt-b  const [o   const [erreS  coss  cobo  co"f  const [o   const [error, setEt-b  cons    const [o   const [error, setEt-b  const [   ,   ccript    phone_numrne  const [o   const [error, setEt-b  const [o   const [error, setError] = useState('');
  coss  .l  const [o   const [error, setEt-b  cri  coss  .l  const [o   const [error, setEt-b  const [o   cong.  const [o   const [err&   cos-b  coss  .l  const [o   const [error, setEt-b  const [o   const [erreS  coss  cobo  co"f  const [o   const [error, setEt-b  cons    const [o SP  coss  .l  const [o   const [error, setEt-b  const [o   cong.  const [o   const [error, setEt-b  const [o   const [error, setError] = useState('');
  cos-b  coss  .l  const [o   const [error, setEt-b  const [o   const [erreS  coss  cobo  co"f  const [o   const [error, setEt-b  cons    const al  cos-b  coss  .l  const [o   const [error, setEt-b  const [o   const [erreS  coss  cobo  co"f  const [o   const [error, setEt-b  cons    const [o  u  coss  .l  const [o   const [error, setEt-b  cri  coss  .l  const [o   const [error, setEt-b  const [o   cong.  const [o   const [err&   cos-b  coss  .l  const [o   const [error, setEt-b  const [o   const [erreS  coss  cobo  co"f  const [o   const [error, setEt-b  cons    const [o SP  coss  Na  cos-b  coss  .l  const [o   const [error, setEt-b  const [o   const [erreS  coss  cobo  co"f  const [o   const [error, setEt-b  cons    const al  cos-b  coss  .l  const [o   const [error, setEt-b  const [o   const [erreS  coss  cobo  co"f  const [o   const [error, setEt-b  cons    const [o  u  coss  .l  const [o   const [error, setEt-b  cri  coss  .l  const [o   const [error, setEt-b  const [o   cong.  const [o   const [err&  * Create Schedule Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white border-4 border-black p-6 w-full max-w-lg">
            <h3 className="text-xl font-bold uppercase mb-4 border-b-4 border-black pb-2">SCHEDULE NEW CALL</h3>
            <div className="space-y-4">
              <div>
                <label className="font-bold uppercase text-xs block mb-1">Phone Number</label>
                <input type="tel" value={formData.phone_number} onChange={(e) => setFormData(p => ({ ...p, phone_number: e.target.value }))} className="w-full border-4 border-black px-3 py-2 focus:outline-none" placeholder="+1234567890" />
              </div>
              <div>
                <label className="font-bold uppercase text-xs block mb-1">First Call At (ISO datetime)</label>
                <input type="datetime-local" value={formData.first_call_at} onChange={(e) => setFormData(p => ({ ...p, first_call_a      {showCreate && (
 la        <div classNam-4          <div className="bg-white border-4 border-black p-6 w-full max-w-lg">
            <h3 classNamgr            <h3 className="text-xl font-bold uppercase mb-4 border-b-4 borderon            <div className="space-y-4">
              <div>
                <label className="font-bold uppercaha              <div>
                <lca                <lva                <input type="tel" value={formData.phone_number} onChange={(e) => setFormData(                </div>
              <div>
                <label className="font-bold uppercase text-xs block mb-1">First Call At (ISO datetime)</label>
                <input type="datetime-local" value={formData.first_call_at} onChange={va              <div>op                <l                  <input type="datetime-local" value={formData.first_call_at} onChange={(e) => setFormData(p =>rc la        <div classNam-4          <div className="bg-white border-4 border-black p-6 w-full max-w-lg">
            <h3 classNamgr            <h3 classar            <h3 classNamgr            <h3 className="text-xl font-bold uppercase mb-4 border-b-                        <div>
                <label className="font-bold uppercaha              <div>
                <lca                <lva          /o                <l                  <lca                <lva                <input type="teec              <div>
                <label className="font-bold uppercase text-xs block mb-1">First Call At (ISO datetime)</label>
                <input Na                <erc                <input type="datetime-local" value={formData.first_call_at} onChange={va              <div>opon            <h3 classNamgr            <h3 classar            <h3 classNamgr            <h3 className="text-xl font-bold uppercase mb-4 border-b-                        <div>
                <label className="font-bold uppercaha              <div>
                <lca                <lva          /o                <l                  <lca    ={                <label className="font-bold uppercaha              <div>
                <lca                <lva          /o                <l                  <lca                         <lca                <lva          /o                <l al                <label className="font-bold uppercase text-xs block mb-1">First Call At (ISO datetime)</label>
                <input Na                <erc       
                 <input Na                <erc                <input type="datetime-local" value={formData.fir                  <label className="font-bold uppercaha              <div>
                <lca                <lva          /o                <l                  <lca    ={                <label className="font-bold uppercaha              <div>
                <lca                <lva          /o                <l              {/                <lca                <lva          /o                <l la                <lca                <lva          /o                <l                  <lca                         <lca                <lva          /o                                  <input Na                <erc       
                 <input Na                <erc                <input type="datetime-local" value={formData.fir                  <label className="font-bold uppercaha              <div>
                <lca                <lva                        <inpuue={immediateData.phone_number}                <lca                <lva          /o                <l                  <lca    ={                <label className="font-bold uppercaha              <div>
                              <lca                <lva          /o                <l              {/                <lca                <lva          /o                <l la          "                  <input Na                <erc                <input type="datetime-local" value={formData.fir                  <label className="font-bold uppercaha              <div>
                <lca                <lva                        <inpuue={immediateData.phone_number}                <lca                <lva          /o                <l                   <input ty                <lca                <lva                        <inpuue={immediateData.phone_number}                <lca                <lva          /o                <l             ou                              <lca                <lva          /o                <l              {/                <lca                <lva          /o                <l la          "                  <input Na                <erc                <input type="datetime-Re                <lca                <lva                        <inpuue={immediateData.phone_number}                <lca                <lva          /o                <l                   <input ty                <lca                <lva                        <inpuue={immediateData.phone_number}                <lca                <lva          /o                <l )}
    </div>
  );
}
