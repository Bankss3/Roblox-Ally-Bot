import axios from "axios"
import chalk from "chalk"

const cookie = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_92881CDD7668495AD9B2D33C3B556742CB7D467288A58890252B297048E6CE98887520818D0201988C778D3FFF5788CF9FD51B6D52ED16091C74E7B40405BEBDA4151A8E7415108881C8B80F55BF5959D064740A7722570C0B15D313149557B54DC43A1145D95898F3E59C6F5E9E31F20EF42F827C98C596F15611330FBBA64FDA93110BB2904750C761E20573595B2866D107EC2CDB0B94CEF0F44314671E98821AFE02A8A61271C59CF6AD494911152A02C652B8ECC21DA48F6F9E0B0957A7E2C78AA0C92EC398A5FE524A23C4D0CAE379AD38FFF602878410A79CD68D6840974FD31C614A0EE6F9DEC15E5A1D548E9E1435B652228F1714F05437AA1BC55E4A126F926B327F094DAD795A6C3079E1D86400A05C89B0F373826AE98321B31CAEEA1954756DAEC6F9398656C81626BDFF8DDAB1575F3ACC71A45972F2B4F4B08002FE0BA7FF4C27476189211865A9C6B9778B8F2487D92216E947385566C3279C852E9EF813EFCB6EEBCA416CEC6BF6C19807F0F208821FE3E97EFE346451952000175D69BFCD2C7352DE9539E4B0446BAC74999541F8FF5F55A47D2CCDB7536CA4AB35982FDB6433CC5BB0228988FA1AD562013556852868FB8DBC8D795FBD2B6CB691EBCA1D30DD1333A679E9D70A4E04391543BFDE8B828C31B8415E21D80A984123EE39458F67DDD80A7AC3C6622341B7E9A2C3994F12A6DEC301C9E7F8157CFDB9A9263E1926C86FA15BEB145A9049642DA3D239F09812DAD0846277B52BDEAF39A89CF22505B8A430BB26D3D13C6E21F87B4FED0CC1AB17E9E470B80B1AD3EDC94666505645D909313454134E8B0D9E0E9FCCC192E7D14719EC942F71B909B42C919A8436D67FC7B20EF284F543C32F07D12604981EBFA061A160618FAFBCCED771E2D20722043B9A0F20B72F79EBF84608482B365A6ED9E40CB9E8CBD02EEB0B2CCC1B99ED6899313BB2249C924846356B629F14E05CA5EA82FD8B41E019B4FC1A86B03375AA6693D12E262F31F4C598"
const group = "33273617" // group id

// who cares about impure fn 🥱 ?
const request = async (api, csrf = "") => {
    return axios.post("https://" + api, "", {
        headers: {
            Cookie: ".ROBLOSECURITY=" + cookie,
            'X-Csrf-Token': csrf,
        },
    })
}

const getCSRF = async () => {
    console.log(chalk.blue.bold("[LOGGER] : Getting CSRF Token"))
    return new Promise(resolve => {
        request("auth.roblox.com/v2/logout")
            .catch(res => {
                const csrf = res.response.headers['x-csrf-token']
                console.log(chalk.blue.bold("[LOGGER] : CSRF Token : " + csrf))
                resolve(csrf)
            })
    })
}
(async () => {
    console.log(chalk.blue.bold("By :"))
    console.log(chalk.blue.bold("Discord :  _mrunknown_"))
    console.log(chalk.underline.blue.bold("Github :  @CodeCarbon"))

    var csrf = await getCSRF()
    while (true) {
        const sentGroup = Math.floor(Math.random() * 1150000)
        console.log(chalk.blue.bold("[LOGGER] : Sending request to : " + sentGroup))
        //using "await" to make sure the request is sent in order
        //removing .then() and .catch() and using try/catch instead
        try {
            await request("groups.roblox.com/v1/groups/" + group + "/relationships/allies/" + sentGroup, csrf)
            console.log(chalk.green("[Success] :" + sentGroup))
        } catch (err) {
            console.log(chalk.red("[Error] : " + err))
            if (err.response.status == 429) {
                console.log(chalk.red("[Error] : Rate Limited"))
                console.log(chalk.blue.bold("[LOGGER] : It is expected to be 5 requests per 5 to 10 minutes"))
                console.log(chalk.blue.bold("[LOGGER] : Waiting 5 minutes"))
                await new Promise(resolve => setTimeout(resolve, 500000))
            }
            csrf = await getCSRF()
        }
    }
})();
