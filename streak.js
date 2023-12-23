fetch("https://codeforces.com/api/user.status?handle=antares_alphaSco")
  .then((response) => response.json())
  .then((submissionObj) => {
    var submissions = submissionObj.result;
    var acceptedSubs = submissions.filter(submission => submission.verdict === "OK");
    var isTodayDone = acceptedSubs.filter(ac => {
        let nowDate = new Date();
        let acDate = new Date(ac.creationTimeSeconds * 1000);
        return nowDate.toDateString() === acDate.toDateString();
    }).length > 0;
    acceptedSubs.sort((a, b) => b.creationTimeSeconds - a.creationTimeSeconds);
    if(isTodayDone) {
        let streakCnt = getStreak(acceptedSubs, new Date());
        console.log(streakCnt);
        const svgCode = '<svg fill="#ff8800" height="20vh" width="20vh" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 611.999 611.999" xml:space="preserve" stroke="#ff8800"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M216.02,611.195c5.978,3.178,12.284-3.704,8.624-9.4c-19.866-30.919-38.678-82.947-8.706-149.952 c49.982-111.737,80.396-169.609,80.396-169.609s16.177,67.536,60.029,127.585c42.205,57.793,65.306,130.478,28.064,191.029 c-3.495,5.683,2.668,12.388,8.607,9.349c46.1-23.582,97.806-70.885,103.64-165.017c2.151-28.764-1.075-69.034-17.206-119.851 c-20.741-64.406-46.239-94.459-60.992-107.365c-4.413-3.861-11.276-0.439-10.914,5.413c4.299,69.494-21.845,87.129-36.726,47.386 c-5.943-15.874-9.409-43.33-9.409-76.766c0-55.665-16.15-112.967-51.755-159.531c-9.259-12.109-20.093-23.424-32.523-33.073 c-4.5-3.494-11.023,0.018-10.611,5.7c2.734,37.736,0.257,145.885-94.624,275.089c-86.029,119.851-52.693,211.896-40.864,236.826 C153.666,566.767,185.212,594.814,216.02,611.195z"></path> </g> </g></svg>';
        const svgContainer = document.getElementById('svg-container');
        svgContainer.innerHTML = svgCode;

        const streakValueContainer = document.getElementById('streak-value');
        streakValueContainer.innerHTML = streakCnt;
    } else {
        const svgCode = '<svg fill="#d4d4d4" height="20vh" width="20vh" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 611.999 611.999" xml:space="preserve" stroke="#d4d4d4"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M216.02,611.195c5.978,3.178,12.284-3.704,8.624-9.4c-19.866-30.919-38.678-82.947-8.706-149.952 c49.982-111.737,80.396-169.609,80.396-169.609s16.177,67.536,60.029,127.585c42.205,57.793,65.306,130.478,28.064,191.029 c-3.495,5.683,2.668,12.388,8.607,9.349c46.1-23.582,97.806-70.885,103.64-165.017c2.151-28.764-1.075-69.034-17.206-119.851 c-20.741-64.406-46.239-94.459-60.992-107.365c-4.413-3.861-11.276-0.439-10.914,5.413c4.299,69.494-21.845,87.129-36.726,47.386 c-5.943-15.874-9.409-43.33-9.409-76.766c0-55.665-16.15-112.967-51.755-159.531c-9.259-12.109-20.093-23.424-32.523-33.073 c-4.5-3.494-11.023,0.018-10.611,5.7c2.734,37.736,0.257,145.885-94.624,275.089c-86.029,119.851-52.693,211.896-40.864,236.826 C153.666,566.767,185.212,594.814,216.02,611.195z"></path> </g> </g></svg>';
        const svgContainer = document.getElementById('svg-container');
        svgContainer.innerHTML = svgCode;
        let yesterday = new Date();
        yesterday.setTime(yesterday.getTime() - 24*60*60*1000);
        let streakCnt = getStreak(acceptedSubs, yesterday);

        const streakValueContainer = document.getElementById('streak-value');
        streakValueContainer.innerHTML = streakCnt;
    }
  })

  let getStreak = (acceptedSubs, curDate) => {
    let streakCnt = 0;
    for(let i=0; i<acceptedSubs.length; i++) {
        let acDate = new Date(acceptedSubs[i].creationTimeSeconds * 1000);
        if(acDate.toDateString() === curDate.toDateString()) {
            if(streakCnt===0)
                streakCnt++;
            continue;
        }
        curDate.setTime(curDate.getTime() - 24*60*60*1000);
        if(acDate.toDateString() === curDate.toDateString()) {
            streakCnt++;
            continue;
        }
        break;
    }
    return streakCnt;
  }
