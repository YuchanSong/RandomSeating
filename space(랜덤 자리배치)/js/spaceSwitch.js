var nameList = [];	// 배치할 이름 목록
var anim = true; 	// 애니메이션 상태(true, false)

$(document).ready(function() {
	// 멤버 전체의 객체와 배열 생성
	setMemList();

	// 배치 순서 섞기 클릭
    $("#shuffleBtn").click(function() {
    	randomSequence(nameList);
    	console.log(nameList);
    	alert("Shake it, Shake it~");
    });

    // 자리 배치하기 클릭
    $("#startBtn").click(function() {
    	// 배치 중 버튼 사용 제한하기
    	$(this).prop("disabled", true);
    	$("#shuffleBtn").prop("disabled", true);

		showAnimation(nameList); // 애니메이션 + 데이터 초기화
    });
});

/* ********************
 *
 *	공통적으로 쓸 함수들
 *
 * ******************** */

// 배치 순서 랜덤으로 섞어줌
var randomSequence = function(a) {
	a.sort(function() {
		return Math.random() - Math.random();
	});
};

// 배열에서 특정 요소 제거하기
var removeItem = function(item, a) {
	var idx = $.inArray(item, a);
	if (idx != -1) a.splice(idx, 1);
};

// 멤버 리스트 데이터 삽입
var setMemList = function() {
	nameList.push("황인준");
	nameList.PUSH("김진태");
	nameList.push("서은정");
	nameList.push("김현희");
	nameList.push("심승경");
	nameList.push("최승진");
	nameList.push("송유찬");
	nameList.push("한상빈");
	nameList.push("김소희");
	nameList.push("기도희");
	nameList.push("전혜원");
};


// 배치 종료 후 데이터 초기화
var initData = function() {
	nameList = [];
	setMemList();
};

/* ******************
 *
 *	애니메이션 부분
 *
 * ****************** */

// li Element에서 index 구하기
var getIndex = function(elem) {
    var idx = 0;
    for (idx; elem=elem.previousElementSibling; idx++);
    return idx;
};

// 굴러가다 멈추는 애니메이션
var slotEffect = function(block, elem, time) {
    const effect = setInterval(function() {
    	$(elem).find("label").text(names[Math.floor(Math.random() * names.length)]);
    }, 50); // 0.05초 마다 멤버 이름이 랜덤으로 바뀌게

    // 일정 시간 이후 데이터 Set
    setTimeout(function() {
        clearInterval(effect);

        var $this = $(elem).find("label");

    	// 글씨 커졌다 작아지게
		var originalSize = $this.css("fontSize");

		$this.animate({
                fontSize: "30px"
        }, 1000);

		$this.animate({
                fontSize: originalSize
        }, 500);

    	// 지정된 자리 입력
    	var randomName = names[Math.floor(Math.random() * names.length)]
		$this.text(randomName);
		removeItem(randomName, names);

    },  time * 1500 + 1500);
};

// 분단별로 애니메이션 발생, 각 항목씩 끝날수 있도록 설정
var startAnimation = function() {
	var $li;

	// 1분단
	$li = $(".p1").find("li").not(".empty");
	$.each($li, function(idx, elem) {
		slotEffect(0, elem, idx);
	});

	// 2분단
	$li = $(".p2").find("li");
	$.each($li, function(idx, elem) {
		slotEffect(1, elem, idx + 3);
	});

	// 3분단
	$li = $(".p3").find("li");
	$.each($li, function(idx, elem) {
		slotEffect(2, elem, idx + 7);
	});

	// 애니메이션 끝나는거 기다렸다가 데이터 초기화 및 버튼 활성화
	setTimeout(function() {
		initData();
		$("#startBtn").prop("disabled", false);
		$("#shuffleBtn").prop("disabled", false);
		alert("배치가 완료되었습니다!");
		console.log("프로그램이 종료되어 데이터가 초기화되었습니다.");
    }, names.length * 1500 + 1500);
};

// 애니메이션 보여주기
var showAnimation = function(nameList) {
    anim && (
        names = nameList,
        anim = false,
        startAnimation(),
        setTimeout(function() {
            anim = true
        }, 8500)
    );
};
