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
        }
    };

    const handleUpload = async () => {
        if (!image) {
            setMessage("请先选择图片。");
            return;
        }

        const cookies = JSON.parse(localStorage.getItem('cookies'));
        const user = JSON.parse(localStorage.getItem('user'));

        if (!cookies || !user) {
            router.push('/');
            return;
        }

        getPanToken(cookies)
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
            <main className="p-[20px] max-w-[600px]">
                <div className="mt-[10px] border-2 border-gray-300 rounded-md p-[10px] w-full">
                    <input type="file" accept="image/*" onChange={handleFileChange} />

                    {
                        preview && <img src={preview} alt="Preview" className="w-[100%] max-h-[300px] mt-[10px]" referrerPolicy="no-referrer" />
                    }
                </div>

                <div className="mt-[10px] border-2 border-gray-300 rounded-md p-[10px] w-full break-all">
                    <p>文件名：<span className="text-gray-500">{image?.name}</span></p>
                    <p>下载链接：<span className="text-gray-500">{data?.data?.previewUrl}</span></p>
                    <p>文件ID：<span className="text-gray-500">{data?.data?.objectId}</span></p>
                </div>

                <button onClick={handleUpload} className="mt-[10px] bg-blue-500 text-white px-4 py-2 rounded-md w-full">上传图片</button>
            </main>
        </div >
    );
}