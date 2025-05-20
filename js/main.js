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
    if (window.innerWidth <= 768) {
        $('.gallery li').each(function (index, el) {
            $(el).click(function () {
                const title = $(this).find('h2').text()
                const text = $(this).find('p').text()
                const idx = $(this).index()
                $('.gallery').css({ 'display': 'none' })
                if (idx < 5) {
                    $('.web_iframe').addClass('on')
                    $('.web_iframe').find('iframe').attr('src', `${videoSrc[idx]}`)
                    $('.play_interface').addClass('on')

                    $('.web_play').css({
                        'background': `url(images/image${idx + 1}_1.jpg) no-repeat center/cover`
                    })
                    $('.play_interface_title').css({
                        'background': `url(images/image${idx + 1}_title.jpg) no-repeat center 90%/cover`
                    })
                    $('.wrap_web .play_info').find('p').text(infoSrc[idx])
                    $('.play_top .title').hide()
                    $('.wrap_web').addClass('on')
                }
                else {
                    $('.web_iframe').find('iframe').attr('src', `${videoSrc[idx]}`)
                    $('.web_iframe').addClass('on')
                    $('.wrap_web .play_info').find('p').text('JINHOO LEE')
                    $('.web_play').css({
                        'background': `url(images/image${idx + 1}_1.jpg) no-repeat center/cover`
                    })
                    $('.wrap_web').addClass('on')
                    $('.profile_interface .icon').css({
                        'display': 'flex'
                    })
                    $('.mobile_profile').css({
                        'left': '0'
                    })
                }
            })
        })
    } else {
        $('.gallery li').each(function (index, el) {
            $(el).click(function () {
                const title = $(this).find('h2').text()
                const text = $(this).find('p').text()
                const idx = $(this).index()
                $('.gallery').css({ 'display': 'none' })
                $('.web_iframe').find('iframe').attr('src', `${videoSrc[idx]}`)
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
                $('.web_iframe').find('iframe').attr('src', `${videoSrc[idx]}`)
                $('.play_interface').addClass('on')

                $('.profile_box_text').css({ 'bottom': '-50px' })
                $('.web_play').css({
                    'background': `url(images/image${idx + 1}_1.jpg) no-repeat center/cover`
                })
                $('.play_interface_title').css({
                    'background': `url(images/image${idx + 1}_title.jpg) no-repeat center 90%/cover`
                })
                $('.wrap_web .play_info').find('p').text(infoSrc[idx])
                $('.play_top .title').find('p').text(title)
                $('.wrap_web').addClass('on')
            })
        })
    }
    $('.profile_box_text').click(function () {
        const videoSrc = 'https://www.youtube.com/embed/qvZutqHp5RU?si=8zs6tySga6ZuTMaQ?autoplay=1'
        $('.gallery').css({ 'display': 'none' })
        $('.profile_box_text').css({ 'bottom': '-50px' })
        $('.web_iframe').find('iframe').attr('src', videoSrc)
        $('.profile_interface').addClass('on')
        $('.wrap_web .play_info').find('p').text('profiletext')
        $('.play_top2').removeClass('on')
        $('.web_play').css({
            'background': 'url(../images/image6_1.jpg) no-repeat center/cover'
        })
        $('.play_top .title').find('p').text('Profile')
        $('.wrap_web').addClass('on')
        $('.profile_interface .icon').css({
            'display': 'flex'
        })
    })
    $('.play_top .logo, .play_top .close, .play_top .title').click(function () {
        var iframe = $('#video');
        var currentSrc = iframe.attr('src');
        if (currentSrc.includes('autoplay=1')) {
            var newSrc = currentSrc.replace('autoplay=1', 'autoplay=0');
            iframe.attr('src', newSrc);
        }
        var newSrc = currentSrc.replace('autoplay=1', 'autoplay=0');
        iframe.attr('src', newSrc);
        $('.wrap_web').removeClass('on')
        $('.profile_box_text').css({ 'bottom': '0' })
        $('.play_interface').removeClass('on')
        $('.profile_interface').removeClass('on')
        $('.gallery').css({ 'display': 'flex' })
        $('.mobile_profile').css({
            'left': '-110%'
        })
    })
    $('.play_btn').click(function () {
        $('.web_iframe').addClass('on')
        $('.play_top2').addClass('on')
    })
    $('.play_top2 .logo, .play_top2 .close').click(function () {
        var iframe = $('#video');
        var currentSrc = iframe.attr('src');
        if (currentSrc.includes('autoplay=1')) {
            var newSrc = currentSrc.replace('autoplay=1', 'autoplay=0');
            iframe.attr('src', newSrc);
        }
        $('.play_top2').removeClass('on')
        $('.web_iframe').removeClass('on')
        var newSrc = currentSrc.replace('autoplay=1', 'autoplay=0');
        iframe.attr('src', newSrc);
    })
    $('.profile_interface').click(function () {
        $('.web_iframe').addClass('on')
        $('.play_top3').addClass('on')
    })
    $('.play_top3 .logo, .play_top3 .close').click(function () {
        var iframe = $('#video');
        var currentSrc = iframe.attr('src');
        if (currentSrc.includes('autoplay=1')) {
            var newSrc = currentSrc.replace('autoplay=1', 'autoplay=0');
            iframe.attr('src', newSrc);
        }
        $('.play_top3').removeClass('on')
        $('.web_iframe').removeClass('on')
        $('.profile_interface').addClass('on')
        var newSrc = currentSrc.replace('autoplay=1', 'autoplay=0');
        iframe.attr('src', newSrc);
    })
})
