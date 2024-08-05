function popup()
{
    var t=document.getElementById("up");
    var x1=document.getElementById("blur1");
    var x2=document.getElementById("blur2");
    var x3=document.getElementById("blur3");
    if(t.style.display==="none")
    {
    t.style.display="block";
    x1.style.opacity="0";
    x2.style.opacity="0";
    x3.style.opacity="0";
    x1.style.paddingLeft="30%";
    x2.style.paddingLeft="30%";
    x3.style.paddingLeft="0%";
}
else
{
        x1.style.paddingLeft="10%";
        x2.style.paddingLeft="10%";
        // x3.style.paddingLeft="%";
        t.style.display="none";
        x1.style.opacity="1";
        x2.style.opacity="1";
        x3.style.opacity="1";
    }
}


    
