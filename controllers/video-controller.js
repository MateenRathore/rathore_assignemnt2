const fs = require('fs');

const stream_video = (req, res) => {
    let videoPath = './videos/Leg Strength.mp4';
    if(req.params.id === "1"){
        videoPath = './videos/Strengthening Exercises.mp4';
    }else if(req.params.id === "2"){
        videoPath = './videos/Balance Exercises.mp4';
    }else if(req.params.id === "3"){
        videoPath = './videos/Flexibility Exercises.mp4';
    }else if(req.params.id === '4'){
        videoPath = './videos/Leg Strength.mp4';
    }
    const range = req.headers.range;
    const videoSize = fs.statSync(videoPath).size;

    const chunkSize = 1 * 1e+6;
    const start = Number(range.replace(/\D/g, ''));
    const end = Math.min(start + chunkSize, videoSize -1);

    const contentLength = end - start + 1;

    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4"
    }
    res.writeHead(206, headers);

    const stream = fs.createReadStream(videoPath, { start, end })
    stream.pipe(res);
};

const videopage = (req, res)=>{
    res.render('video',{id:req.params.id});
};
module.exports= {
    stream_video,
    videopage
}