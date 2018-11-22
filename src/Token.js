class Token
{
    setCookie(name, value, day)
    {
        if (day)
        {
            let date = new Date();
            date.setTime(date.getTime()+(day*24*60*60*1000));
            var expire = "; expire="+date.toGMTString();
        }
        else
        {
            expire = "";
        }
        document.cookie = name+"="+value+expire+"; path=/";
    }

    readCookie(name)
    {

        let name2 = name + "=";
        let arrCookies = document.cookie.split(';');

        for(let i=0;i < arrCookies.length;i++)
        {
            let a = arrCookies[i];
            while (a.charAt(0)===' ')
            {
                a = a.substring(1,a.length);
            }
            if (a.indexOf(name2) === 0)
            {
                return a.substring(name2.length,a.length);
            }
        }
        return null;
    }
    get()
    {
        return this.readCookie("token");
    }

    set(token)
    {
        this.setCookie("token", token, 1);
    }
}

let token = new Token();

export  default token