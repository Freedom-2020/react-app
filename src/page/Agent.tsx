import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { agentData, getList, AgentType,  changeType, changeName, getShowAgents, updateAgent, getAgent} from './AgentSlice'
import classNames from 'classnames'
import Popup from '../components/popup'
import './Agent.css'

function Agent(){
    const agentModel = useAppSelector(agentData);
    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(getList())
    }, [dispatch])

    useEffect(()=>{
        if(agentModel.agentType){
            dispatch(getShowAgents({type:  agentModel.agentType, name: agentModel.agentName}))
        }
    }, [agentModel.agentType, agentModel.agentName, agentModel.agents, dispatch])

    return (
        <div className="main-agent">
            <div className="card-div flex">
                <div className="card-top building font-color-wt">
                    <div className="rotate-box">
                        <i className="icon-cog card-icon"></i>
                    </div>
                    <div className="name-box">Building</div>
                    <div className="count-box">{agentModel.agents.filter(x => x.status === 'building').length}</div>
                </div>
                <div className="card-top idle font-color-wt">
                    <i className="icon-coffee card-icon-coffee"></i>
                    <div className="name-box">Idle</div>
                    <div className="count-box">{agentModel.agents.filter(x => x.status === 'idle').length}</div>
                </div>
                <div className="card-top all-data">
                    <div className="flex card-type">
                        <span className="all-type">ALL</span>
                        <span className="phy-type">PHYSICAL</span>
                        <span className="vir-type">VIRTUAL</span>
                    </div>
                    <div className="flex card-count">
                        <span className="all-type">{agentModel.agents.length}</span>
                        <span className="phy-type">{agentModel.agents.filter(x => x.type === AgentType.Physical).length}</span>
                        <span className="vir-type">{agentModel.agents.filter(x => x.type === AgentType.Virtual).length}</span>
                    </div>
                </div>
            </div>
            
            <div className="search-box flex">
                <ul className="flex">
                    <li onClick={()=> dispatch(changeType(AgentType.All))} className={classNames({'tab-active': agentModel.agentType === AgentType.All})}>All</li>
                    <li onClick={()=> dispatch(changeType(AgentType.Physical))} className={classNames({'tab-active': agentModel.agentType === AgentType.Physical})}>Physical</li>
                    <li onClick={()=> dispatch(changeType(AgentType.Virtual))} className={classNames({'tab-active': agentModel.agentType === AgentType.Virtual})}>Virtual</li>
                </ul>
                <div className="ipt-div">
                    <input data-testid="agentName" onInput={(e)=> dispatch(changeName(e.currentTarget.value))} className="search-ipt"/>
                    <i className="icon-search"></i>
                </div>
                <div className="icon-th-box flex-inline">
                    <i className="icon-th-card pointer"></i>
                    <i className="icon-th-list pointer color-active"></i>
                </div>
            </div>

            <div className="list-container">
            {
                agentModel.showAgents.map((item) =>
                    <div key={item.id} className="box-agent flex">
                        <div className={item.os + "-icon os-box"}>
                        </div>
                        <div className="box-agent-rt">
                            <div className="show-top flex-inline">
                                <i className="icon-desktop icon-comm desktop-i"></i>
                                <span className="name-span">{item.name}</span>
                                <span className="status-span">
                                    <span className={classNames('font-color-wt status-box', {'idle-b': item.status === 'idle', 'building-b': item.status !== 'idle'})}>{item.status}</span>
                                </span>
                                <i className="icon-info icon-comm"></i>
                                <span>{item.ip}</span>
                                <i className="icon-folder icon-comm folder-i"></i>
                                <span>{item.location}</span>
                            </div>
                            <div className="flex show-bottom">
                                <Popup resources={item.resources} addResource={(resourceList: string[]) => dispatch(updateAgent(getAgent(true, item, resourceList)))} />
                                <div className="resource-box flex-inline">
                                {
                                    item.resources.map((resource) =>
                                    <span key={resource} className="resource-p flex">
                                        <span className="box-res ellipsis" title={resource}>{resource}</span>
                                        <i onClick={() => dispatch(updateAgent(getAgent(false, item, [resource])))} className="icon-trash delete-icon pointer"></i>
                                    </span>
                                )}
                                </div>
                                <div>
                                {
                                    <span className={classNames("deny-span font-color-wt pointer", {hide: item.status === 'idle'})}><i className="icon-deny deny"></i>Deny</span>
                                }
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            </div>
        </div>
    )
}

export default Agent;