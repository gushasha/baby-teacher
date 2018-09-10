<template>
  <div class="bind-wrapper">
    <div class="logo-wrap"><img class="logo-img" src="/static/img/logo.png"/></div>
    <group title="输入手机号，轻松绑定！">
      <x-input title="手机号" v-model="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile" >
        <x-button
          v-if="showSendCodeBtn"
          slot="right"
          type="primary"
          mini
          @click.native="sendVerifyCode"
        >发送</x-button>
        <x-button
          v-else
          slot="right"
          disabled
          mini
        >发送{{ sendTimer.count }}s</x-button>
      </x-input>
      <x-input title="验证码" v-model="code"  :min="4" :max="4" :disabled="mobile.length !== 11"></x-input>
    </group>
    <div class="agree-wrapper">
      <check-icon :value.sync="agree">
        <span class="agree-text">阅读并同意</span>
      </check-icon>
      <a class="policy-link" @click="displayPolicy">《相关条款》</a>
    </div>
    <p>
      <x-button type="primary" :disabled="!submitBtnStatus" @click.native="submitBind">确 定</x-button>
    </p>
    <div v-transfer-dom>
      <popup v-model="showPolicy" position="right" width="100%">
        <div class="policy-wrapper ">
          <div class="site-text"><p style="text-align:center"><strong><span class="scayt-misspell-word" data-scayt-lang="en_US" data-scayt-word="一门APP平台服务协议">一门APP平台服务协议</span></strong></p><p><br></p><p><span class="scayt-misspell-word" data-scayt-lang="en_US" data-scayt-word="欢迎您使用一门APP平台服务！">欢迎您使用一门APP平台服务！</span></p><p><br></p><p>为使用一门APP平台服务，您应当阅读并遵守《一门APP平台服务协议》（以下简称“本协议”）。请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款、管辖与法律适用条款。限制、免责条款可能以加粗或加下划线的形式提示您重点注意。除非您已阅读并接受本协议所有条款，否则您无权使用一门APP平台提供的服务，您使用一门APP平台的服务即视为您已阅读并同意上述协议的约束。</p><p><br></p><p><strong>如果您未满18周岁，请在法定监护人的陪同下阅读本协议，并特别注意未成年人使用条款。</strong></p><p><br></p><p><span class="scayt-misspell-word" data-scayt-lang="en_US" data-scayt-word="一、服务说明">一、服务说明</span></p><p><br></p><p>1.1 一门APP平台是由成都一扇门科技有限公司（以下简称“<span class="scayt-misspell-word" data-scayt-lang="en_US" data-scayt-word="一门网络">一门网络</span>”）提供的移动客户端解决方案，并由一门网络开发并运营的网络平台；本协议是您与一门网络之间关于您一门APP平台相关服务所订立的协议。</p><p><br></p><p>1.2 一门APP平台服务是为企业客户提供手机应用并运用平台为企业客户提供信息发布功能以及其他相关手机应用功能的收费服务，简称“服务”。“客户”是指使用一门APP平台相关服务的使用人，在本协议中更多地称为“您”。</p><p><br></p><p>1.3 一门网络作为一门APP平台的开发商，为一门APP平台客户提供平台运营服务以及包括提供插件、插件开发工具、版本更新、信息发布、客户数据云储存等增值服务。您可根据自身需求，选择享受以上全部或部分服务并支付相应对价，您全面充分履行完毕相应付款义务后，一门网络会为您提供在平台进行管理的相应权限，由客户自行负责对其用户进行管理，您在平台上的任何管理行为由您自行负责，管理行为的后果以及责任由您个人承担。</p><p><br></p><p>1.4 服务以及功能的正常实现以一门APP平台客户正确履行管理行为，正确完成平台设置等为前提条件。</p><p><br></p><p><span class="scayt-misspell-word" data-scayt-lang="en_US" data-scayt-word="二、服务内容">二、服务内容</span></p><p><br></p><p>2.1 一门APP平台基础服务依照您购买的服务标准为基础进行计价。除非本协议另有约定，否则双方同意以您购买平台服务标准和年限为唯一标准计算基础服务费用。产品金额及期限以订购页面所载内容为准。同时一门APP平台保留随时调整使用费用标准的权利。</p><p><br></p><p>2.2 如您就标准服务以外购买服务的，一门APP平台根据单个购买的服务项目和年限等情况计收服务费用。如某个功能服务项下的服务到期、终止或发生其他任何变化的，不影响其他项目的服务和费用的收取。</p><p><br></p><p>2.3 一门APP平台会根据您向最终用户提供的包括但不限于钱包中心的充值提现等业务时提供代收代付的服务，并收取提现金额的1%的手续费，您同意并理解，一门APP平台仅是代收代付服务的第三方，不参与您和最终用户的任何交易、服务等内容，因您和最终用户产生的任何纠纷与一门APP平台无关，因此给一门APP平台造成损失的，您应全额赔偿。</p><p><br></p><p>2.4 计费周期和服务年限：服务起始日即一门APP平台收到付款之日，双方约定从服务起始日起开始计费，满365天计为一个服务年限。收款日以一门APP平台收款银行记录的入账日期为准。</p><p><br></p><p>2.5 您订购的服务期满前两星期内，一门APP平台将通知续缴费用。若您在期满之日尚未续缴费用，服务即刻被停止。如您使用了客户数据云储存服务，一门APP平台将在服务停止之日起保存您服务项目信息30天时间，30天后还未续缴，则将删除相应服务项目信息。</p><p><br></p><p><span class="scayt-misspell-word" data-scayt-lang="en_US" data-scayt-word="三、客户权利和义务">三、客户权利和义务</span></p><p><br></p><p>3.1 一门APP平台为您提供管理权限，您可根据权限进行平台管理，如版本更新、广告UI的修改等管理行为。您在履行管理员职责时应遵守一门APP平台相关管理员行为规范，应对平台用户就各项功能的使用行为进行指导与监督。因您的行为导致一门APP平台损失（包括因此一门APP平台需对第三方承担的损失、一门APP-社群应用因此需承担的行政罚款等）均由您承担赔偿责任。如因您对功能使用不当造成的损失，与一门APP平台无关。</p><p><br></p><p>3.2 您在使用本服务时须遵守法律法规，自行承担发表内容的法律责任，对服务的使用应根据所有适用该服务的地方、国家和国际法律以及互联网等方面的规定，包括但不限于：</p><p><br></p><p>（1） 向外发送信息时必须符合有关国家或地区的法律、法规之规定。</p><p>（2） 使用服务不作非法用途，遵守所在国家有关法律、法规规定。</p><p>（3） <span class="scayt-misspell-word" data-scayt-lang="en_US" data-scayt-word="不干扰或混乱网络服务。">不干扰或混乱网络服务。</span></p><p>（4） <span class="scayt-misspell-word" data-scayt-lang="en_US" data-scayt-word="遵守所有使用服务的网络协议、规定和程序。">遵守所有使用服务的网络协议、规定和程序。</span></p><p>（5） <span class="scayt-misspell-word" data-scayt-lang="en_US" data-scayt-word="遵守互联网道德规范。">遵守互联网道德规范。</span></p><p>（6） 不得利用服务发送垃圾信息或分发任何未经允许的信息。</p><p>不得利用本服务从事违法违规行为，包括但不限于：</p><p><br></p><p>（1） 发布、传送、传播、储存危害国家安全统一、破坏社会稳定、违反公序良俗、侮辱、诽谤、淫秽、暴力以及任何违反国家法律法规的内容；</p><p>（2） 发布、传送、传播、储存侵害他人知识产权、商业秘密等合法权利的内容；</p><p>（3） <span class="scayt-misspell-word" data-scayt-lang="en_US" data-scayt-word="恶意虚构事实、隐瞒真相以误导、欺骗他人；">恶意虚构事实、隐瞒真相以误导、欺骗他人；</span></p><p>（4） <span class="scayt-misspell-word" data-scayt-lang="en_US" data-scayt-word="发布、传送、传播广告信息及垃圾信息；">发布、传送、传播广告信息及垃圾信息；</span></p><p>（5） <span class="scayt-misspell-word" data-scayt-lang="en_US" data-scayt-word="传输教唆他人构成犯罪行为的资料；">传输教唆他人构成犯罪行为的资料；</span></p><p>（6） <span class="scayt-misspell-word" data-scayt-lang="en_US" data-scayt-word="其他法律法规禁止的行为。">其他法律法规禁止的行为。</span></p><p>3.3 如果您违反了本条约定，相关国家机关或机构可能会对您提起诉讼、罚款或采取其他制裁措施，并要求一门APP平台给予协助，造成损害的，您应依法予以赔偿，一门APP平台不承担任何责任。</p><p><br></p><p>3.4 如果一门APP平台发现或收到他人举报您发布的信息违反本条约定，一门APP平台有权进行独立判断并采取技术手段予以删除、屏蔽或断开链接。同时，一门APP平台有权视行为的性质，采取包括但不限于暂停或终止服务，追究法律责任等措施。</p><p><br></p><p>3.5 您违反本条约定，导致任何第三方损害的，您应当独立承担责任；一门APP平台因此遭受损失的，您也应当一并赔偿。</p><p><br></p><p><span class="scayt-misspell-word" data-scayt-lang="en_US" data-scayt-word="四、一门APP平台权利和义务">四、一门APP平台权利和义务</span></p><p><br></p><p>4.1 一门APP平台为您提供服务的管理权限，便于您自行管理其客户端和功能设置。</p><p><br></p><p>4.2 您知悉、理解并同意授权一门APP平台可非独家、可转授权地使用您通过一门APP平台发布的内容，前述内容包括但不限于文字、图片、视频等。具体来说，可能会包括：</p><p><br></p><p>4.2.1 将前述内容通过一门APP平台自身或其他第三方技术、网络等在一门APP平台选择的网络平台、应用程序或产品中，以有线或无线网，通过免费或收费的方式在不同终端（包括但不限于电脑、手机、互联网电视、机顶盒及其他上网设备等）以不同形式（包括但不限于点播、直播、下载等）进行网络传播或电信增值服务等；</p><p><br></p><p>4.2.2 将前述内容复制、翻译、编入一门APP平台当前已知或以后开发的作品、媒体或技术中，用于一门APP平台相关用途开发或推广宣传等；</p><p><br></p><p>4.2.3 将前述内容授权给电台、电视台、网络媒体、运营商平台等与一门APP平台有合作的媒体或运营商播放、传播，用于一门APP平台相关推广宣传等；</p><p><br></p><p>4.2.4 其他一门APP平台出于善意或另行取得您授权的使用行为；</p><p><br></p><p>4.2.5 您对一门APP平台的前述授权并不改变您发布内容的所有权及知识产权归属，也并不影响您行使其对发布内容的合法权利；</p><p><br></p><p>4.2.6 一门APP平台将尽最大的商业努力合理使用您的授权内容，但并不代表一门APP平台承诺一定会使用。</p><p><br></p><p>4.3 如果您违反本协议的约定或法律规定，一门APP平台有权中断或终止提供服务并且剩余服务费不予退还，一门APP平台还可以采取其他认为合适的措施。</p><p><br></p><p>4.4 <span class="scayt-misspell-word" data-scayt-lang="en_US" data-scayt-word="本协议期内">本协议期内</span>,一门APP平台有权根据实际情况不定期对服务内容（包括但不限于更新平台规范或价格）进行调整，并将调整后内容及时通知您，通知方式为向您后台账户发送调整后内容以及在平台中对调整后内容予以公示，您不接受调整后条件及条款的，应在接到后台通知起3日内或平台公示之日起7日内（以先达到日期为准）向一门APP平台发送书面解约通知，一门APP平台在收到您解约通知书后将立即终止提供服务。一门APP平台按约收取服务起始日至服务终止日期间产生的费用后将您余款（如有）无息退还。此情况下，您无权要求一门APP平台进行赔偿或承担其他责任。您逾期未发出书面通知的，视为同意一门APP平台的调整，双方应根据调整后的条款及内容履行本合同。</p><p><br></p><p>4.5 一门APP平台有权根据实际情况停止服务，并会及时通知到您，您同意并保证：不因此要求一门APP平台进行赔偿或承担其他责任。一门APP平台按约收取服务起始日至服务终止日期间产生的费用后将甲方余款（如有）无息退还。</p><p><br></p><p>4.6 特别提示：一门APP平台仅向您提供开发工具，一门APP平台对您使用开发工具开发的衍生产品及服务不承担任何责则，如没有您的特别要求，对您的用户数据、发布、传播的内容等不予存储，一门APP平台不提供应用的云服务，小群社群平台对您发布、传播的任何内容不承担审核义务，亦不对客户的任何行为承担责任。</p><p><br></p><p><span class="scayt-misspell-word" data-scayt-lang="en_US" data-scayt-word="五、按现状提供服务">五、按现状提供服务</span></p><p><br></p><p>您理解并同意，一门APP平台的服务是按照现有技术和条件所能达到的现状提供的。一门APP平台会尽最大努力向您提供服务，确保服务的连贯性和安全性；但一门APP平台不能随时预见和防范法律、技术以及其他风险，包括但不限于不可抗力、病毒、木马、黑客攻击、系统不稳定、第三方服务瑕疵、政府行为等原因可能导致的服务中断、数据丢失以及其他的损失和风险。</p><p><br></p><p><span class="scayt-misspell-word" data-scayt-lang="en_US" data-scayt-word="六、知识产权、保密条款">六、知识产权、保密条款</span></p><p><br></p><p>6.1 一门APP平台用于服务及相关业务上运行的软件、数据等的所有权归一门APP平台所有。您有义务保证一门APP平台的知识产权不因您的行为受第三方的侵犯。且您保证不得使用、复制一门APP平台与服务有关的软件、数据，不得允许第三方窃取一门APP平台的软件及数据。在本协议终止之后，双方在本条款项下的义务并不随之终止。</p><p><br></p><p>6.2 任何一方对在合作过程中所获知的对方及一门APP平台未向社会公开的技术秘密和商业秘密均负有保密义务，未经对方书面许可，任何一方不得将其泄露给第三方，否则应承担违约责任并赔偿损失。在本协议终止之后，各方仍需遵守协议之保密条款，履行其所承诺的保密义务，直到对方同意其解除此项义务，或事实上不会因违反本协议的保密条款而给对方造成任何形式的损害时为止。</p><p><br></p><p><span class="scayt-misspell-word" data-scayt-lang="en_US" data-scayt-word="七、免责条款和相关约定">七、免责条款和相关约定</span></p><p><br></p><p>7.1 你理解并同意：为了向您提供有效的服务，本服务会利用您终端设备的处理器和带宽等资源。本服务使用过程中可能产生数据流量的费用，您需自行向运营商了解相关资费信息，并自行承担相关费用。</p><p><br></p><p>7.2 您在使用本服务时，须自行承担如下一门APP平台不可掌控的风险内容，包括但不限于：</p><p><br></p><p>7.2.1 由于受到计算机病毒、木马或其他恶意程序、黑客攻击的破坏等不可抗拒因素可能引起的信息丢失、泄漏等风险；</p><p><br></p><p>7.2.2 您或一门APP平台的电脑软件、系统、硬件和通信线路出现故障；</p><p><br></p><p>7.2.3 您操作不当或通过非一门APP平台授权的方式使用本服务；</p><p><br></p><p>7.2.4 您发布的内容被他人转发、分享，因此等传播可能带来的风险和责任；</p><p><br></p><p>7.2.5 由于网络信号不稳定等原因，所引起的一门APP平台登录失败、资料同步不完整、页面打开速度慢等风险；</p><p><br></p><p>7.2.6 <span class="scayt-misspell-word" data-scayt-lang="en_US" data-scayt-word="其他一门APP平台无法控制或合理预见的情形。">其他一门APP平台无法控制或合理预见的情形。</span></p><p><br></p><p>7.3 您理解并同意，您通过一门APP平台发布的内容可能会被其他用户或第三方复制、转载、修改或做其他用途，脱离您的预期和控制，您应充分意识到此类风险的存在，任何您不愿被他人获知的信息都不应在一门APP平台发布。</p><p><br></p><p>7.4 您理解并同意，因业务发展需要，一门APP平台保留单方面对本服务的全部或部分服务内容在任何时候不经任何通知的情况下变更、暂停、限制、终止或撤销的权利。</p><p><br></p><p>7.5 您理解并同意，一门APP平台对服务不提供包括但不限于适销性、适用性、可靠性、准确性、完整性、无病毒以及无错误的任何明示或默示保证。基于以下原因而造成的您利润、商业信誉、资料损失或其他有形或无形损失，一门APP平台不承担任何直接、间接、附带、衍生或惩罚性的赔偿：</p><p><br></p><p>1）经由服务购买或取得的任何产品、资料或服务；</p><p><span class="scayt-misspell-word" data-scayt-lang="en_US" data-scayt-word="2）客户资料遭到未授权的使用或修改；">2）客户资料遭到未授权的使用或修改；</span></p><p><span class="scayt-misspell-word" data-scayt-lang="en_US" data-scayt-word="3）其他与服务相关的事宜。">3）其他与服务相关的事宜。</span></p><p>7.6 您理解并同意，一门APP平台在进行服务器配置、邮件系统维护升级时，一门APP平台会提前通过网络公告等方式通知您。在此期间发生的服务暂停现象，或者由于网络通路的偶然阻塞造成服务应用故障，不可视为一门APP平台违约。</p><p><br></p><p><span class="scayt-misspell-word" data-scayt-lang="en_US" data-scayt-word="八、违约责任">八、违约责任</span></p><p><br></p><p>8.1 任何一方违反本协议的任何条款，守约方有权以书面形式通知违约方守约方将暂时中止其在本协议下的相应义务的履行，直至违约方停止违约行为并采取充分、有效及时的措施消除违约后果并赔偿守约方因违约行为而遭致的损失。</p><p><br></p><p>8.2 无论发生何种情况，一门APP平台在提供服务过程中因其过错给您带来损失的，而支付的补偿总额不应超过您已向一门APP平台支付的服务费用。</p><p><br></p><p><span class="scayt-misspell-word" data-scayt-lang="en_US" data-scayt-word="九、协议的生效与变更">九、协议的生效与变更</span></p><p><br></p><p>9.1 您使用一门APP平台的服务即视为您已阅读本协议并接受本协议的约束。</p><p><br></p><p>9.2 一门APP平台有权在必要时修改本协议条款。您可以在相关服务页面查阅最新版本的协议条款。</p><p><br></p><p>9.3 本协议条款变更后，如果您继续使用一门APP平台提供的软件或服务，即视为您已接受修改后的协议。如果您不接受修改后的协议，应当停止使用一门APP平台提供的软件或服务。</p><p><br></p><p><span class="scayt-misspell-word" data-scayt-lang="en_US" data-scayt-word="十、服务的变更、中断、终止">十、服务的变更、中断、终止</span></p><p><br></p><p>10.1 一门APP平台可能会对服务内容进行变更，也可能会中断、中止或终止服务。</p><p><br></p><p>如发生下列任何一种情形，一门APP平台有权不经通知而中断或终止向您提供的服务：</p><p><br></p><p>（1）根据法律规定您应提交真实信息，而您提供的个人资料不真实、或与注册时信息不一致又未能提供合理证明；</p><p><span class="scayt-misspell-word" data-scayt-lang="en_US" data-scayt-word="（2）您违反相关法律法规或本协议的约定；">（2）您违反相关法律法规或本协议的约定；</span></p><p><span class="scayt-misspell-word" data-scayt-lang="en_US" data-scayt-word="（3）按照法律规定或主管部门的要求；">（3）按照法律规定或主管部门的要求；</span></p><p><span class="scayt-misspell-word" data-scayt-lang="en_US" data-scayt-word="（4）出于安全的原因或其他必要的情形。">（4）出于安全的原因或其他必要的情形。</span></p><p>10.3 一门APP平台有权按本协议第二条的约定进行收费。若您未按时足额付费，一门APP平台有权中断、中止或终止提供服务。</p><p><br></p><p>10.4 您有责任自行备份存储在本服务中的数据。如果您的增值服务被终止，一门APP平台可以从服务器上永久地删除您的数据,但法律法规另有规定的除外。服务终止后，一门APP平台没有义务亦无法向您返还数据。</p><p><br></p><p><span class="scayt-misspell-word" data-scayt-lang="en_US" data-scayt-word="十一、争议解决与适用法律">十一、争议解决与适用法律</span></p><p><br></p><p>11.1 本协议的订立、执行和解释及争议的解决均应适用中国法律。</p><p><br></p><p>11.2 如双方就本协议内容或其执行发生任何争议，双方应进行友好协商。协商不成时，任何一方均可向一门APP平台所在地人民法院提起诉讼。</p><p><br></p><p><span class="scayt-misspell-word" data-scayt-lang="en_US" data-scayt-word="十二、未成年人使用条款">十二、未成年人使用条款</span></p><p><br></p><p>12.1 若用户未满18周岁，则为未成年人，应在监护人监护、指导下阅读本协议和使用本服务。</p><p><br></p><p>12.2 未成年人用户涉世未深，容易被网络虚象迷惑，且好奇心强，遇事缺乏随机应变的处理能力，很容易被别有用心的人利用而又缺乏自我保护能力。因此，未成年人用户在使用本服务时应注意以下事项，提高安全意识，加强自我保护：</p><p><br></p><p>（1）认清网络世界与现实世界的区别，避免沉迷于网络，影响日常的学习生活；</p><p>（2）填写个人资料时，加强个人保护意识，以免不良分子对个人生活造成骚扰；</p><p>（3）在监护人或老师的指导下，学习正确使用网络；</p><p>（4）避免陌生网友随意会面或参与联谊活动，以免不法分子有机可乘，危及自身安全。</p><p>12.3 监护人、学校均应对未成年人使用本服务时多做引导。特别是家长应关心子女的成长，注意与子女的沟通，指导子女上网应该注意的安全问题，防患于未然。</p><p><br></p><p><span class="scayt-misspell-word" data-scayt-lang="en_US" data-scayt-word="十三、其他">十三、其他</span></p><p><br></p><p>13.1 本协议所有条款的标题仅为阅读方便，本身并无实际涵义，不能作为本协议涵义解释的依据。</p><p><br></p><p>13.2 本协议条款无论因何种原因部分无效或不可执行，其余条款仍有效，对双方具有约束力。</p><p><br></p><p style="text-align:right"><span class="scayt-misspell-word" data-scayt-lang="en_US" data-scayt-word="成都一扇门科技有限公司"><strong>成都一扇门科技有限公司</strong></span></p></div>
          <div class="policy-option-wrapper vux-1px-t">
            <div>
              <x-button mini type="primary" @click.native="handleAgree(true)">同意</x-button>
            </div>
            <div >
              <x-button mini  @click.native="handleAgree(false)">拒绝</x-button>
            </div>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>
<script>
import { Group, XInput, XButton, CheckIcon, Popup } from 'vux'
import { _axios } from 'common/myAxios'

export default {
  name: 'bind',
  components: {
    Group,
    XInput,
    XButton,
    CheckIcon,
    Popup
  },
  data () {
    return {
      mobile: '',
      code: '',
      agree: false,
      showPolicy: false,
      showSendCodeBtn: true,
      sendTimer: {
        timeCount: 60,
        timer: null,
        count: 0
      }
    }
  },
  computed: {
    submitBtnStatus () {
      return this.code.length === 4 && this.mobile.length === 11
    }
  },
  methods: {
    sendVerifyCode () {
      if (this.mobile.length !== 11) {
        this.$vux.toast.text('请输入正确的手机号～', 'middle')
        return false
      }
      if (this.sendTimer.timer) {
        this.$vux.toast.text(this.sendTimer.timer + '秒后重试～', 'middle')
        return false
      }
      this.sendTimer.count = this.sendTimer.timeCount
      this.showSendCodeBtn = false
      this.code = '8888'
      this.sendTimer.timer = setInterval(() => {
        if (this.sendTimer.count > 0) {
          this.sendTimer.count--
        } else {
          this.showSendCodeBtn = true
          clearInterval(this.sendTimer.timer)
          this.sendTimer.timer = null
        }
      }, 1000)
    },
    displayPolicy () {
      this.showPolicy = true
    },
    handleAgree (status) {
      this.showPolicy = false
      this.agree = status
    },
    submitBind () {
      if (!this.agree) {
        this.$vux.toast.text('请阅读并同意相关条款～', 'middle')
        return
      }
      let requestData = {
        mobile: this.mobile,
        code: this.code
      }
      _axios.get('/api/wTeacher/user/bind', requestData).then(res => {
        this.$vux.toast.show({
          type: 'success',
          text: '绑定成功～'
        })
        this.$router.push('/home')
      })
    }
  }
}
</script>
<style lang="less" scoped>
.bind-wrapper {
  margin: 0 10px;
}
.logo-wrap {
  width: 50%;
  margin: 5% auto;
}
.logo-img {
  width: 100%;
}
.agree-wrapper {
  margin: 15px auto;
  font-size: 13px;
}
  .agree-text {
    color: #999999;
  }
  .policy-link {
    color: #586C94;
  }
  .policy-wrapper {
    padding: 10px;
    background: #ffffff;
  }
  .policy-option-wrapper {
    margin: 10px auto;
    padding-top: 10px;
    display: flex;
    justify-content: space-around;
  }
</style>
