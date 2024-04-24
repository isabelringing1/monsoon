var storyData;
var currentIndex = 0;
var images;
var imageIndex;

window.onload = (event) => {
    $.getJSON("story.json", function(json) {
        storyData = json.story;
        if (window.location.hash){
            console.log(window.location.hash.substring(1) - 1)
            currentIndex = window.location.hash.substring(1) - 1;
        }
        loadPart()
        $("#next-button")[0].addEventListener('click', nextPart);
        $("#back-button")[0].addEventListener('click', previousPart);
        $("#story-img")[0].addEventListener('click', clickImage);
    });
};

function loadPart(){
    if (!storyData || !storyData[currentIndex]){
        return;
    }
    console.log("loading part " + currentIndex)

    if (currentIndex > 0){
        window.location.hash = currentIndex + 1;
    }
    else{
        history.replaceState(null, null, ' '); // gets rid of hash, somehow
    }
   
    if (storyData[currentIndex].text){
        var paragraphs = storyData[currentIndex].text.split('\n');
        $("#story-text")[0].innerHTML = ""
        for (var i = 0; i < paragraphs.length; i++){
            $("#story-text")[0].innerHTML += "<p>&emsp;" + paragraphs[i] + "</p>"
        }
        $("#back-button")[0].style.display = currentIndex == 0 || currentIndex == storyData.length - 1 ? "none" : "block";
        $("#next-button")[0].style.display = currentIndex == storyData.length - 1 ? "none" : "block";
        $("#story-text")[0].style.display = "block";
        $("#story-img")[0].style.display = "none";
        $("#title")[0].style.opacity = 1;
        $("#wave")[0].style.display = currentIndex == storyData.length - 1 ? "block" : "none";
    }
    else if (storyData[currentIndex].images){
        $("#back-button")[0].style.display = "none";
        $("#next-button")[0].style.display = "none";
        $("#story-text")[0].style.display = "none";
        $("#story-img")[0].style.display = "flex";
        $("#title")[0].style.opacity = 0;

        images = []
        imageIndex = 0
        for (var i = 0; i < storyData[currentIndex].images.length; i++){
            var img = document.createElement('img');
            img.src = storyData[currentIndex].images[i];
            img.id = currentIndex + "-image-" + i;
            img.className = "story-img"
            images.push(img)
        }
        
        $("#story-img")[0].innerHTML = ""
        $("#story-img")[0].appendChild(images[0])
    }
    
}

function nextPart(){
    currentIndex++;
    loadPart();
}

function previousPart(){
    currentIndex--;
    if (storyData[currentIndex].images != null){
        currentIndex--;
    }
    loadPart();
}

function clickImage(){
    if (imageIndex == images.length - 1){
        nextPart()
        return
    }
    imageIndex++
    $("#story-img")[0].innerHTML = ""
    $("#story-img")[0].appendChild(images[imageIndex])
}