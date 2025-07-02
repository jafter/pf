$(function () {
    $(window).resize(function () { document.location.reload(); })
    const videoSrc = ['https://www.youtube.com/embed/zAGVQLHvwOY?si=CM_pJvq2Jotn9eHq?autoplay=1',
        'https://www.youtube.com/embed/-bBHT158E0s?si=mjzsPzwb4Rjqz1fq?autoplay=1',
        'https://www.youtube.com/embed/CiVnG_Phy7c?si=aneYyqAaLvFlJKsW?autoplay=1',
        'https://www.youtube.com/embed/AD_kAFdzwQY?si=SOOeckgxB5ERLEuu?autoplay=1',
        'https://www.youtube.com/embed/d2VN6NNa9BE?si=A1JEb22Q1ATCJeMl?autoplay=1',
        'https://www.youtube.com/embed/qvZutqHp5RU?si=8zs6tySga6ZuTMaQ?autoplay=1',
    ]
    const infoSrc = ['rkrkrkrkrk',
        'sksksksksk',
        'ekekekekek',
        'fkfkfkfkfk',
        'akakakakak',
    ]
    const spanEl = document.querySelector('.name h2 span')
    const textArr = ['inhoo Lee', 'Web Designer', 'After Effect', 'Web Publisher', 'Premiere Pro']

    let index = 0;
    let currentTxt = textArr[index].split("")

    function writeTxt() {
        spanEl.textContent += currentTxt.shift()
        if (currentTxt.length !== 0) {
            setTimeout(writeTxt, Math.floor(Math.random() * 100))
        } else {
            currentTxt = spanEl.textContent.split("")
            setTimeout(deleteTxt, 3000)
        }
    }
    function deleteTxt() {
        currentTxt.pop()
        spanEl.textContent = currentTxt.join("")
        if (currentTxt.length !== 0) {
            setTimeout(deleteTxt, Math.floor(Math.random() * 100))
        } else {
            index = (index + 1) % textArr.length
            currentTxt = textArr[index].split("")
            writeTxt()
        }
    }
    writeTxt()
    const openDetail = (idx, title = '', text = '', isProfile = false) => {
        $('.gallery').css({ 'display': 'none' })

        if (!isProfile) {
            $('.web_iframe').addClass('on').find('iframe').attr('src', `${videoSrc[idx]}`)
            $('.play_interface').addClass('on')
            $('.web_play').css({
                'background': `url(images/image${idx + 1}_1.jpg) no-repeat center/cover`
            })
            $('.play_interface_title').css({
                'background': `url(images/image${idx + 1}_title.jpg) no-repeat center 90%/cover`
            })
            $('.wrap_web .play_info').find('p').text(infoSrc[idx])
            $('.play_top .title').find('p').text(title)
            $('.wrap_web').addClass('on')

            // ✅ 뒤로가기 히스토리 쌓기
            history.pushState({ page: 'detail' }, '', '');
        } else {
            $('.profile_box_text').css({ 'bottom': '-50px' })
            $('.web_iframe').addClass('on').find('iframe').attr('src', videoSrc)
            $('.profile_interface').addClass('on')
            $('.wrap_web .play_info').find('p').text('profiletext')
            $('.play_top .title').find('p').text('Profile')
            $('.wrap_web').addClass('on')
            $('.profile_interface .icon').css({ 'display': 'flex' })

            history.pushState({ page: 'profile' }, '', '');
        }
    }

    if (window.innerWidth <= 768) {
        $('.gallery li').each(function (index, el) {
            $(el).click(function () {
                const title = $(this).find('h2').text()
                const text = $(this).find('p').text()
                const idx = $(this).index()
                openDetail(idx, title, text, idx >= 5)
            })
        })
    } else {
        $('.gallery li').each(function (index, el) {
            $(el).click(function () {
                const title = $(this).find('h2').text()
                const text = $(this).find('p').text()
                const idx = $(this).index()
                openDetail(idx, title, text, false)
            })
        })
    }

    $('.profile_box_text').click(function () {
        const videoSrc = 'https://www.youtube.com/embed/qvZutqHp5RU?si=8zs6tySga6ZuTMaQ?autoplay=1';
        openDetail(5, 'Profile', '', true);
    });

    // ✅ 공통 닫기 함수 (.close 동작을 흉내냄)
    function closeDetail() {
        var iframe = $('#video');
        var currentSrc = iframe.attr('src');
        if (currentSrc.includes('autoplay=1')) {
            var newSrc = currentSrc.replace('autoplay=1', 'autoplay=0');
            iframe.attr('src', newSrc);
        }
        iframe.attr('src', currentSrc.replace('autoplay=1', 'autoplay=0'));

        $('.wrap_web').removeClass('on')
        $('.profile_box_text').css({ 'bottom': '0' })
        $('.play_interface').removeClass('on')
        $('.profile_interface').removeClass('on')
        $('.gallery').css({ 'display': 'flex' })
        $('.mobile_profile').css({ 'left': '-110%' })
    }

    // ✅ 닫기 버튼 클릭 이벤트
    $('.play_top .logo, .play_top .close, .play_top .title').click(closeDetail);
    $('.play_top2 .logo, .play_top2 .close').click(closeDetail);
    $('.play_top3 .logo, .play_top3 .close').click(closeDetail);

    // ✅ 뒤로가기 시 .close 동작 실행
    window.onpopstate = function (event) {
        closeDetail();
    };

    $('.play_btn').click(function () {
        $('.web_iframe').addClass('on')
        $('.play_top2').addClass('on')
    })

    $('.profile_interface').click(function () {
        $('.web_iframe').addClass('on')
        $('.play_top3').addClass('on')
    })
})