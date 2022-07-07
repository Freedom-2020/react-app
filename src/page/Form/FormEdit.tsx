import { useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import moment from 'moment';
import { Form, Card, Row, Col, Button, Select, InputNumber, Radio, TreeSelect } from "antd";
import { OptionType } from '../../common/type';
import { formEdit, changeField } from './FormEditSlice'
const Option=Select.Option

const input2Options = [
   { label: 'Standard', value: 'standard' },
   { label: 'Estimation', value: 'estimation' },
]
    
const input62Options = [
   { label: 'yes', value: 'yes' },
   { label: 'no', value: 'no' },
]


function useDidUpdateEffect(fn: Function, inputs: any){
    const didMountRef = useRef(false)
    useEffect(() => {
        if(didMountRef.current){
            fn()
        }else{
            didMountRef.current = true
        }
    }, inputs)
}

function FormEdit() {
    const ReduxData = useAppSelector(formEdit);
    const dispatch = useAppDispatch();
    const [formFormEdit] = Form.useForm()
    
        useEffect(()=>{
            
            const fetchinput77TreeData = async ()=>{
                const response = await fetch('/api/getTree',{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    })
                const data = (await response.json()) as OptionType
                dispatch(changeField({fieldName:  'input77TreeData', fieldValue: data}))
            }
            fetchinput77TreeData()
                        
        }, [])
    
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };
    const initialValues = {
        input2: 'standard',
    }
        
    const input32Validator = () => {
        return () => ({
            validator() {
                if (ReduxData.FormEdit.input32 > 0) {
                    return Promise.resolve();
                }

                return Promise.reject(new Error(' > 0'));
            },
        })
    }
    
    
    
    function input17Display(){
        return ReduxData.FormEdit.input2 === 'standard'
    }
                        
    
    const onValuesChange = (fields:any) =>{
        Object.keys(fields).forEach(key => {
            dispatch(changeField({fieldName:  key, fieldValue: fields[key]}))
        });
    }
    return (
        <div>
            <Form 
                form={formFormEdit} 
                onFinish={onFinish} 
                name="testForm" 
                layout="vertical"
                initialValues={initialValues}                 
                onValuesChange={onValuesChange}>

                <Card title="Information" type="inner">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item 
                                name="input2" 
                                label="Input2">

                                <Select  className="fullWidth">
                                    {input2Options.map(option => 
                                        <Option key={option.value} value={option.value}>{option.label}</Option>
                                    )}
                                </Select>
                            </Form.Item>
                        </Col>
                        
                        {input17Display() &&
                            <Col span={12}>
                            <Form.Item 
                                name="input17" 
                                label="Input17"
                                rules={[
                                    { required: true,  },
                                    { required: true,  },
                                ]}>

                                <InputNumber     className="fullWidth" />
                            </Form.Item>
                        </Col>
                        }
                        <Col span={12}>
                            <Form.Item 
                                name="input62" 
                                label="Input62">

                                <Radio.Group  defaultValue="undefined" className="fullWidth">
                                    {input62Options.map(option => 
                                        <Radio key={option.value} value={option.value}>{option.label}</Radio>
                                    )}
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item 
                                name="input32" 
                                label="Input32"
                                rules={[
                                    input32Validator(),
                                ]}>

                                <InputNumber     className="fullWidth" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item 
                                name="input77" 
                                label="Input77">

                                <TreeSelect  treeData={ReduxData.FormEdit.input77TreeData} className="fullWidth" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default FormEdit