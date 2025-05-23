"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { getCourseList } from './action';

const 加载中 = (
    <div className="flex justify-center items-center h-full mt-[40vh]">
        <p className='text-gray-500 text-[10vw] font-bold'>加载中...</p>
    </div>
)

const 无数据 = (
    <div className="flex justify-center items-center h-full mt-[40vh]">
        <p className='text-gray-500 text-[10vw] font-bold'>无数据</p>
    </div>
)


export default function CoursesPage() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const cookies = JSON.parse(localStorage.getItem('cookies'));
        const user = JSON.parse(localStorage.getItem('user'));

        if (!cookies || !user) {
            router.push('./login?redirect=/courses');
            return;
        }

        getCourseList(cookies)
            .then(res => {
                setLoading(false);
                console.info("课程", res);

                if (!res.result) {
                    router.push('./login?redirect=/courses');
                    return;
                }

                const data = res.channelList
                    .filter(item => item.cataName == '课程')
                    .map(item => {
                        return {
                            'courseName': item.content.course ? item.content.course.data[0]?.name : item.content.name,
                            'className': item.content.course ? item.content.name : item.content.clazz[0]?.clazzName,
                            'teacherName': item.content.course ? item.content.course.data[0]?.teacherfactor : item.content.teacherfactor,
                            'courseId': item.content.course ? item.content.course.data[0]?.id : item.content.id,
                            'classId': item.content.course ? item.key : item.content.clazz[0]?.clazzId,
                            'folder': (res.channelList.find(i => i.catalogId == item.cfid) || {}).content?.folderName || null, // 所在的文件夹
                            'isTeach': !item.content.course, // 是否自己教的课
                            'img': item.content.course ? item.content.course.data[0].imageurl : item.content.imageurl,
                        };
                    })
                    .map(item => {
                        const query = Object.entries({
                            'username': user.username,
                            'password': user.password,
                            'courseId': item.courseId,
                            'classId': item.classId,
                            'package': 'sign',
                            'path': '/activity/activity',
                        })
                            .map(([key, value]) => `${key}=${value}`)
                            .join('&')
                        return {
                            ...item,
                            'url': `weixin://dl/business/?appid=wxb42fe32e6e071916&path=pages/share/share&query=${encodeURIComponent(query)}`,
                            'index': `${item.courseId}-${item.classId}-${item.isTeach}`,
                        };
                    });
                data.sort((a, b) => b.isShow - a.isShow);

                setCourses(data);
            })
            .catch(() => {
                router.push('./login?redirect=/courses');
            });
    }, []);

    if (loading) return 加载中;
    if (!courses.length) return 无数据;

    const 小程序 = `weixin://dl/business/?appid=wxb42fe32e6e071916&path=pages/share/share&query=${encodeURIComponent(
        Object.entries({
            'path': '/packages/sign-package/pages/home/home',
            'appid': 'wx0ba7981861be3afc',
        })
            .map(([key, value]) => `${key}=${value}`)
            .join('&'))}`

    return (
        <div className="mx-auto m-[20px] w-full p-[20px]">
            <main className="w-full max-w-[1200px] mx-auto">
                <h1 className="text-3xl font-bold mb-4 text-center">课程列表</h1>
                <ul>
                    <li key="default-top" className="flex items-center mb-4 shadow-lg rounded-[10px] p-4 bg-white">
                        <div className="flex-1">
                            <h2 className="text-[20px] font-bold text-blue-500">🎉🎉 小程序版</h2>
                            <p className="text-gray-500 text-[14px]">支持更多课程</p>
                        </div>
                        <div className="flex items-center">
                            <a href={小程序} className="bg-green-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-green-600">进入小程序</a>
                        </div>
                    </li>

                    {
                        courses.map(course => (
                            <li key={course.index} className="flex items-center mb-4 shadow-lg rounded-[10px] p-4 bg-white">
                                <div className="flex-1">
                                    <h2 className="text-[20px] font-bold text-blue-500">{course.courseName}</h2>
                                    <p className="text-gray-500 text-[14px]">班级：{course.className}</p>
                                    <p className="text-gray-500 text-[14px]">教师：{course.teacherName}</p>
                                </div>
                                <div className="flex items-center">
                                    <a href={course.url} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600">前往签到</a>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </main>
        </div>
    );
}
