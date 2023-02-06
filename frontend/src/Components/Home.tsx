import Container from '@mui/material/Container'
import React from 'react'

function Home() {
    return (
        <><div></div><div>
            <Container maxWidth="md">
                <h1 style={{ textAlign: "center" }}>ระบบโรงพยาบาล</h1>
                <h4>SUT</h4>
                <p>
                ระบบโรงพยาบาลของโรงพยาบาล SUT เป็นระบบที่ให้ผู้ใช้ระบบซึ่งเป็นแพทย์หรือพยาบาล และ เจ้าหน้าที่ เข้าสู่ระบบ 
                เพื่อมาจัดการเกี่ยวกับระบบภายในโรงพยาบาล เจ้าหน้าที่จะมีการบันทึกข้อมูลแพทย์ ข้อมูลคนไข้ ข้อมูลเจ้าหน้าที่ของโรงพยาบาล
                ข้อมูลตึกโรงพยาบาล ข้อมูลอุปกรณ์เครื่องมือแพทย์ ข้อมูลรถพยาบาลฉุกเฉิน  ระบบข้อมูลการรักษาคนไข้ที่โรงพยาบาล ไว้ในระบบ 
                ก่อนที่ให้แพทย์จะทำการแจ้งข้อมูลการรักษา ข้อมูลการจ่ายยา และข้อมูลการนัดคนไข้ที่มาทำการรักษา หลังจากระบบได้รับข้อมูลจากแพทย์
                ระบบจะทำการบันทึกข้อมูลนี้ไปรวมกับข้อมูลคนไข้เพื่อให้ทราบว่าเมื่อคนไข้มาครั้งถัดไปได้ทำการรักษาอะไร ใช้ยาอะไร 
                โดยเมื่อถ้าคนไข้คนนั้นต้องได้รับการผ่าตัด แพทย์จะสามารถแจ้งผ่านระบบได้
                โดยผู้แลระบบจะได้ไปทำการจองห้องผ่าตัด และถ้าหากว่ามีเครื่องมีแพทย์ส่วนใดที่ต้องการเบิกเพิ่ม แพทย์สามารถแจ้งให้ผู้ดูแลระบบทราบได้
                </p>
            </Container>
        </div></>
    )
}

export default Home; 