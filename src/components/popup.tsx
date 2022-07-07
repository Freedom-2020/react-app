import './popup.css'
import { useAppDispatch } from '../app/hooks';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames'
interface PopupProps {
    addResource: Function,
    resources: string[],
}
function Popup(props: PopupProps) {
    const dispatch = useAppDispatch();
    const popupBox = useRef<HTMLDivElement>(null)
    const [showPopup, setShowPopup] = useState(false)
    const [value, setValue] = useState('')
    const [onTop, setOntop] = useState(false)

    function showPopupDo(e: React.MouseEvent<HTMLElement, MouseEvent>) {
        let popupHeight = 150
        setOntop(document.documentElement.clientHeight - e.clientY < popupHeight)
        setShowPopup(true)
    }

    function closePopupDo() {
        setShowPopup(false)
        setValue('')
    }

    function showError() {
        let values = value.trim().split(',').map(x => x.trim())
        let setValues = Array.from(new Set(values))
        return values.some(x => props.resources.includes(x.trim())) || setValues.length < values.length
    }

    function valueChange(val: string) {
        setValue(val.replace(',,', ',').replace(', ', ','))
    }

    function add() {
        if (value.trim() !== '' && !showError()) {
            props.addResource(value.split(',').map(x => x.trim()).filter(x => x !== ''))
            closePopupDo()
        }
    }

    useEffect(() => {
        const documentHandler = (e: Event) => {
            const dom = popupBox.current
            const target = e.target as HTMLElement
            if (!dom?.contains(target)) {
                closePopupDo()
            }
        }
        document.addEventListener('click', documentHandler)
        return () => {
            document.removeEventListener('click', documentHandler)
        }
    }, [dispatch])

    return (
        <div>
            <div ref={popupBox} className="relative">
                <i className="icon-plus plu-ico pointer" onClick={(e) => {showPopupDo(e)}}></i>
                <div data-testid="popupBox" className={classNames({ hide: !showPopup })}>
                    <i className={classNames("triangle", {'triangle-top': onTop})}></i>
                    <div className={classNames("popup-box", {'popup-box-top': onTop})}>
                        <i onClick={closePopupDo} className="icon-close close-btn"></i>
                        <p>Separate multiple resource name with commas</p>
                        <input onInput={(e) => valueChange(e.currentTarget.value)} onChange={(e) => valueChange(e.target.value)} value={value} className="ipt-resource" placeholder="Input value" />
                        <p className={classNames('error-msg', { hidden: !showError() })}>Duplicate resource name</p>
                        <div className="btn-box">
                            <button onClick={add} className={classNames('add-btn font-color-wt pointer', { 'disable-btn': value.trim() === '' || showError() })}>Add Resources</button>
                            <button onClick={closePopupDo} className="cancel-btn font-color-wt pointer">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            <span className="hide">For test</span>
        </div>
    )
}

export default Popup
