$(function () {
    const videoSrc = [
        'https://www.youtube.com/embed/zAGVQLHvwOY?autoplay=1',
        'https://www.youtube.com/embed/-bBHT158E0s?autoplay=1',
        'https://www.youtube.com/embed/CiVnG_Phy7c?autoplay=1',
        'https://www.youtube.com/embed/AD_kAFdzwQY?autoplay=1',
        'https://www.youtube.com/embed/d2VN6NNa9BE?autoplay=1',
        'https://www.youtube.com/embed/qvZutqHp5RU?autoplay=1',
    ];

    const infoSrc = [
        'rkrkrkrkrk',
        'sksksksksk',
        'ekekasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasddfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdasdfaekekek',
        'fkfkfkfkfk',
        'akakakakak',
        'Default info text for last item'
    ];

    const spanEl = document.querySelector('.name h2 span');
    const textArr = ['inhoo Lee', 'Web Designer', 'After Effect', 'Web Publisher', 'Premiere Pro'];
    let index = 0;
    let currentTxt = textArr[index].split("");

    function writeTxt() {
        spanEl.textContent += currentTxt.shift();
        if (currentTxt.length !== 0) {
            setTimeout(writeTxt, Math.floor(Math.random() * 100));
        } else {
            currentTxt = spanEl.textContent.split("");
            setTimeout(deleteTxt, 3000);
        }
    }

    function deleteTxt() {
        currentTxt.pop();
        spanEl.textContent = currentTxt.join("");
        if (currentTxt.length !== 0) {
            setTimeout(deleteTxt, Math.floor(Math.random() * 100));
        } else {
            index = (index + 1) % textArr.length;
            currentTxt = textArr[index].split("");
            writeTxt();
        }
    }

    writeTxt();

    $('.gallery li').click(function () {
        const idx = $(this).index();
        const info = infoSrc[idx] || 'Profile';
        const video = videoSrc[idx] || '';
        const title = $(this).find('h2').text();
        const bgImg = `images/image${idx + 1}_title.jpg`;
        const thumbImg = `images/image${idx + 1}.jpg`;

        createPopup(title, info, video, bgImg, thumbImg);
    });

    $('.profile_box_text').click(function () {
        const title = 'PROFILE';
        const info = `
            <div style="line-height: 2rem">
                <p>1988.03.30</p>
                <p>010-5567-0000</p>
                <p>adoljinhoo@gmail.com</p>
                <p>00대학교 0000000</p>
                <p>00시스템</p>
                <p>안드로이드, ios 앱 개발</p>
                <p>window 어플리케이션 개발</p>
            </div>`;
        const bgImg = 'images/image6_1.jpg';
        const thumbImg = 'images/KakaoTalk_20250403_093258332.gif';

        createProfilePopup(title, info, bgImg, thumbImg);
    });

    function createPopup(title, info, video, bgImg, thumbImg) {
        const isMobile = window.innerWidth < 768;
        const playButton = !isMobile && video ? '<button class="play-btn" style="padding: 0.6rem 4rem; font-size: 1.1rem; border: 2px solid white; border-radius: 4px; background: transparent; color: white; font-weight: bold;">PLAY</button>' : '';
        const thumbSection = !isMobile ? `<div style="width: 33.33%; display: flex; flex-direction: column; align-items: center; gap: 1rem; height: 100%;">
                                <div style="width: 100%; flex: 1; background-image: url('${thumbImg}'); background-size: cover; background-position: center; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.6);"></div>
                                ${playButton}
                            </div>` : '';
       const infoBoxStyle = isMobile 
            ? "width: 100%; background: rgba(0,0,0,0.6); padding: 1rem; border-radius: 8px; color: white; font-size: 1.2rem; height: 30vh; overflow-y: auto; word-break: break-word; white-space: normal; align-self: flex-end;"
            : "flex: 1; background: rgba(0,0,0,0.6); padding: 1rem; border-radius: 8px; color: white; font-size: 1.2rem; height: 100%; display: flex; align-items: flex-start; justify-content: flex-start; overflow-y: auto; word-break: break-word; white-space: normal;";

        const iframeSection = isMobile && video ? `<iframe src="${video}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style="width: 100%; height: 40vh; border-radius: 8px; margin-bottom: 10vh;"></iframe>` : '';

        const popup = $(`
            <div class="popup active" style="display: flex; align-items: center; justify-content: center;">
                <div class="popup-inner" style="background-image: url('${bgImg}'); background-size: cover; background-position: center; height: 90vh; width: 90%; max-width: 1200px; position: relative; display: flex; flex-direction: column; justify-content: space-between; border-radius: 12px; overflow: hidden;">
                    <div class="popup-header" style="padding: 0.5rem 1rem; background: rgba(30,30,30,0.6); backdrop-filter: blur(10px); display: flex; justify-content: center; align-items: center; position: relative;">
                        <span class="popup-title" style="font-size: 1.5rem; font-weight: bold; color: white;">${title}</span>
                        <div class="close-btn" style="position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); cursor: pointer; font-size: 2.5rem; color: white;">×</div>
                    </div>
                    <div class="popup-body" style="display: flex; justify-content: center; align-items: flex-end; height: 100%; padding: 2rem;">
                                              ${iframeSection}
                        <div style="display: flex; background: transparent; padding: 0; gap: 2rem; align-items: center; width: 100%; max-width: 900px; height: 30%;">
                            ${thumbSection}
                            <div style="${infoBoxStyle}">
                                ${info}
                            </div>
                        </div>
                    </div>
                </div>
            </div>`);

        $('body').append(popup);

        popup.find('.close-btn').click(function () {
            popup.remove();
        });

        popup.find('.play-btn').click(function () {
            openVideoPopup(video);
        });
    }

    function createProfilePopup(title, info, bgImg, thumbImg) {
        const popup = $(`
            <div class="popup active" style="display: flex; align-items: center; justify-content: center;">
                <div class="popup-inner" style="background-image: url('${bgImg}'); background-size: cover; background-position: center; height: 90vh; width: 90%; max-width: 1200px; position: relative; display: flex; flex-direction: column; justify-content: space-between; border-radius: 12px; overflow: hidden;">
                    <div class="popup-header" style="padding: 0.5rem 1rem; background: rgba(30,30,30,0.6); backdrop-filter: blur(10px); display: flex; justify-content: center; align-items: center; position: relative;">
                        <span class="popup-title" style="font-size: 1.5rem; font-weight: bold; color: white;">${title}</span>
                        <div class="close-btn" style="position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); cursor: pointer; font-size: 2.5rem; color: white;">×</div>
                    </div>
                    <div class="popup-body" style="display: flex; justify-content: center; align-items: center; height: 100%; padding: 2rem;">
                        <div style="display: flex; background: transparent; padding: 0; gap: 2rem; align-items: stretch; width: 100%; max-width: 1000px; height: 80%;">
                            <div style="width: 50%; height: 100%; border-radius: 4px; cursor: pointer; background-image: url('${thumbImg}'); background-size: cover; background-position: center;"></div>
                            <div style="width: 50%; height: 100%; background: white; padding: 2rem; border-radius: 4px; color: black; font-size: 1.2rem; line-height: 2.2rem; font-weight: 400; display: flex; flex-direction: column; justify-content: space-between;">
                                <div style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">이진후 JINHOO LEE</div>
                                ${info}
                                <div style="margin-top: 2rem; display: flex; gap: 0.3rem;">
                                    <div style="width: 30px; height: 30px; background: #999;"></div>
                                    <div style="width: 30px; height: 30px; background: #666;"></div>
                                    <div style="width: 30px; height: 30px; background: #444;"></div>
                                    <div style="width: 30px; height: 30px; background: #222;"></div>
                                    <div style="width: 30px; height: 30px; background: black;"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`);

        $('body').append(popup);

        popup.find('.close-btn').click(function () {
            popup.remove();
        });

        popup.find('.popup-body > div > div:first-child').click(function () {
            const video = videoSrc[videoSrc.length - 1];
            openVideoPopup(video);
        });
    }

    function openVideoPopup(video) {
        const videoPopup = $(`
            <div class="popup active">
                <div class="popup-inner">
                    <div class="popup-header" style="display: flex; justify-content: flex-end; padding: 1rem; background: rgba(0,0,0,0.5);">
                        <div class="close-btn" style="cursor: pointer; font-size: 2rem; color: white;">×</div>
                    </div>
                    <div class="popup-body video-only">
                        <iframe src="${video}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </div>
                </div>
            </div>`);

        $('body').append(videoPopup);

        videoPopup.find('.close-btn').click(function () {
            videoPopup.remove();
        });
    }

    let lastWidth = $(window).width();

    $(window).on('resize', function () {
        const currentWidth = $(window).width();
        if ((lastWidth > 768 && currentWidth <= 768) || (lastWidth <= 768 && currentWidth > 768)) {
            location.reload();
        }
        lastWidth = currentWidth;

        $('.popup-inner iframe').css('height', window.innerWidth < 768 ? '40vh' : '60vh');
    }).trigger('resize');
});
