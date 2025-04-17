'use client';

import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { login } from './action';

const 官方URL = "https://passport2.chaoxing.com/login?refer=https%3A%2F%2Fmooc1.chaoxing.com%2Fcourse%2Fphone%2Fcourselisthead%3Fpassed%3D1&fid=0&newversion=true&_blank=0"
const 二维码 = "https://cdn.micono.eu.org/image/小程序码/签到小程序.png"

function InputBox() {
    const username = useRef();
    const password = useRef();
    const router = useRouter();
    const [query, setQuery] = useState({});

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setQuery(Object.fromEntries(params.entries()));
    }, []);

    const _login = async e => {
        const u = username.current.value;
        const p = password.current.value;
        if (u === "" || p === "") {
            alert("账号或密码不能为空！");
            return;
        }

        const res = await login(u, p);
        console.info("登录", res);

        if (!res.status) {
            alert(res.mes)
            return;
        }

        localStorage.setItem('cookies', JSON.stringify(res.cookies));
        localStorage.setItem('user', JSON.stringify({
            "username": u,
            "password": p
        }));
        localStorage.setItem('pan', "");

        e.preventDefault();
        const { redirect } = query;
        if (redirect)
            router.push(redirect);
        else
            router.push('/courses');
    }

    return (
        <div className="flex flex-col items-center gap-[10px]">
            <input className="bg-gray-100 rounded-lg w-full h-[40px] px-[10px]" type="text" ref={username} placeholder="请输入账号（手机号）" />
            <input className="bg-gray-100 rounded-lg w-full h-[40px] px-[10px]" type="password" ref={password} placeholder="请输入密码（避免特殊符号）" />
            <button className="bg-blue-500 rounded-lg text-white rounded-lg w-full h-[40px]" onClick={_login}>登录</button>
        </div>
    );
}

export default function Home() {
    return (
        <div className="p-[20px] w-full mt-[10vh]">
            <main className="shadow-lg bg-white rounded-lg w-full max-w-md mx-auto p-[20px] border-[1px] border-gray-200">
                <h1 className="text-[30px] font-bold text-center m-[20px]">学习通登录</h1>

                <img src={二维码} width={200} height={200} alt="御坂学习小程序" className="rounded-[10px] mx-auto mt-4" />

                <p className="text-sm font-bold text-gray-400 text-center m-[8px]">如有侵权，请发邮件至 admin@micono.eu.org</p>
                <p className="text-sm font-bold text-gray-400 text-center m-[8px]">本网页由公众号【御坂网络 Misaka】免费提供</p>
                <p className='text-sm font-bold text-gray-400 text-center m-[8px]'>
                    <a className="text-sm font-bold text-blue-600 text-center m-[8px] mb-[20px] underline" href={官方URL} target="_blank">官方网页版（找回密码）</a>
                    <a className="text-sm font-bold text-blue-600 text-center m-[8px] mb-[20px] underline" href='./image' target="_blank">超星图床（需登录）</a>
                </p>


                <InputBox />
            </main ></div>
    );
}
