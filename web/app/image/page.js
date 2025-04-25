'use client';

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { getPanToken } from './action';

const 上传URL = "https://pan-yz.chaoxing.com/upload";


export default function UploadedPage() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [data, setData] = useState({});
    const router = useRouter();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
            setData({});
        }
    };

    const _getPanToken = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const pan = JSON.parse(localStorage.getItem('pan'));
        const cookies = JSON.parse(localStorage.getItem('cookies'));

        if (pan) {
            return pan;
        }

        if (!cookies || !user) {
            router.push('/?redirect=/image');
            return;
        }

        const res = await getPanToken(cookies);
        localStorage.setItem('pan', JSON.stringify(res));
        return res;
    }

    const handleUpload = async () => {
        if (!image) {
            setMessage("请先选择图片。");
            return;
        }

        _getPanToken()
            .then(res => {
                const formData = new FormData();
                formData.append("file", image);
                formData.append("puid", res.puid);

                return fetch(`${上传URL}?_token=${res._token}`, {
                    method: "POST",
                    body: formData,
                });
            })
            .then(resp => resp.json())
            .then(res => {
                console.info("上传", res);
                setData(res);
                setPreview(res.data.previewUrl);
                navigator.clipboard.writeText(res.data.previewUrl);
            })

    };

    return (
        <div className="w-full h-full" >
            <main className="p-[20px] max-w-[600px] mx-auto mt-[8vh]">
                <h1 className="text-3xl font-bold mb-4 text-center">超星图床</h1>
                <div className="mt-[10px] border-2 border-gray-300 rounded-md p-[10px] w-full">
                    <input type="file" accept="image/*" onChange={handleFileChange} />

                    {
                        preview && <img src={preview} alt="Preview" className="w-[100%] max-h-[300px] mt-[10px]" referrerPolicy="no-referrer" />
                    }
                </div>

                <div className="mt-[10px] border-2 border-gray-300 rounded-md p-[10px] w-full break-all">
                    <p>下载链接：<a className="text-gray-500 underline" href={data?.data?.previewUrl} target="_blank" rel="noreferrer">{data?.data?.previewUrl}</a></p>
                    <p>文件ID：<span className="text-gray-500">{data?.data?.objectId}</span></p>
                </div>

                <button onClick={handleUpload} className="mt-[10px] bg-blue-500 text-white px-4 py-2 rounded-md w-full">上传图片</button>
            </main>
        </div >
    );
}