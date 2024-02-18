
import '../../css/common/Footer.css';

function Footer() {
    return (
        <div id='footer'>
            <div id='footer-top'>
                <ul>
                    <li>
                        <a href="">개인정보처리방침</a>
                    </li>
                    <li>
                        <a href="">이전개인정보처리방침</a>
                    </li>
                    <li>
                        <a href="">이용약관</a>
                    </li>
                    <li>
                        <a href="">영상정보처리방침</a>
                    </li>
                    <li>
                        <a href="">도서관서비스헌장</a>
                    </li>
                    <li>
                        <a href="">저작권신고</a>
                    </li>
                    <li>
                        <a href="">사이트맵</a>
                    </li>
                    <li>
                        <a href="">성고충상담창구</a>
                    </li>
                </ul>
            </div>
            <div id='footer-bottom'>
                <div id='footer-bottom-left'>
                    <div>
                        (41940) 대구 중구 동덕로 115 (삼덕동2가, 진석타워) 7층 703호 전화 <b>053)231-2000</b>
                    </div>
                    <div>
                        (41940) 115, Dongdeok-ro, Jung-gu, Daegu (Samdeok-dong 2-ga) 7Floor 703Ho    
                    </div>
                    <div>
                        Copyright © 2020 DAEGU METROPOLITAN JUNGANG LIBRARY, All rights reserved.
                    </div>
                </div>
                <div id='footer-bottom-right'>
                    <div>
                        <select>
                            <option>
                                대구광역시 공공도서관
                            </option>
                        </select>
                        <button>이동</button>
                    </div>
                    <div>
                        <select>
                            <option>
                                교육 및 지역관련기관
                            </option>
                        </select>
                        <button>이동</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;