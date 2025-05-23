'use client';

import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const 官方URL = "https://passport2.chaoxing.com/login?refer=https%3A%2F%2Fmooc1.chaoxing.com%2Fcourse%2Fphone%2Fcourselisthead%3Fpassed%3D1&fid=0&newversion=true&_blank=0"
const 二维码 = "https://cdn.micono.eu.org/image/小程序码/签到小程序.png"

export default function Home() {
    return (
        <div className="p-[20px] w-full mt-[10vh]">
            <main className="shadow-lg bg-white rounded-lg w-full max-w-md mx-auto p-[20px] border-[1px] border-gray-200">
                <h1 className="text-[30px] font-bold text-center m-[20px]">学习通签到小程序</h1>

                <img src={二维码} width={200} height={200} alt="御坂学习小程序" className="rounded-[10px] mx-auto mt-4" />

                <p className="text-sm font-bold text-center m-[8px]">推荐使用小程序版，功能更多！</p>
                <p className="text-sm font-bold text-gray-400 text-center m-[8px]">如有侵权，请发邮件至 admin@micono.eu.org</p>
                <p className="text-sm font-bold text-gray-400 text-center m-[8px]">本网页由公众号【御坂网络 Misaka】免费提供</p>
                <p className='text-sm font-bold text-gray-400 text-center m-[8px]'>
                    <a className="text-sm font-bold text-blue-600 text-center m-[8px] mb-[20px] underline" href={官方URL} target="_blank">官方网页版（找回密码）</a>
                    <a className="text-sm font-bold text-blue-600 text-center m-[8px] mb-[20px] underline" href='./login'>学习通签到（手动签到）</a>
                </p>
            </main ></div>
    );
}
