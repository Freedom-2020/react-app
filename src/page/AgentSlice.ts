import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export enum AgentType {
    All = 'all',
    Physical = 'physical',
    Virtual = 'virtual',
}

export interface fieldItem {
    key: string,
    value: string | number | Date
}

export interface FilterCondition {
    type: AgentType,
    name?: string,
}

export interface AgentModel {
    id: number;
    name: string;
    type: AgentType;
    os: string;
    status: string;
    ip: string;
    location: string;
    resources: string[];
}

export interface Agents {
    agents: AgentModel[];
    showAgents: AgentModel[];
    agentType?: AgentType;
    agentName?: string;
    status: 'idle' | 'loading' | 'failed';
}

export interface AgentsSetData {
    id: number;
    data: string[];
}

const initialState: Agents = {
    agents: [],
    showAgents: [],
    status: 'idle',
};

export const getAgent = (isAdd: boolean, agent: AgentModel, resources: string[]) => {
    let model = {...agent}
    model.resources = isAdd ? [...model.resources, ...resources] : agent.resources.filter(x => !resources.includes(x))
    return model
}

export const updateAgent = createAsyncThunk(
    'addResource',
    async (agent: AgentModel) => {
        await fetch(`/agents/${agent.id}`, {
            method: 'put',
            body: JSON.stringify(agent),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        })
        return agent
    }
);

export const getList = createAsyncThunk(
    'getList',
    async () => {
        let res = await fetch('/agents')
        const response: unknown = await res.json();
        let data = response as AgentModel[]
        return data;
    }
);

export const agentSlice = createSlice({
    name: 'agent',
    initialState,
    reducers: {
        getShowAgents: (state, action: PayloadAction<FilterCondition>) => {
            state.showAgents = [...state.agents]
            if (action.payload.type !== AgentType.All) {
                state.showAgents = state.agents.filter(x => x.type === action.payload.type)
            }

            if (action.payload.name !== undefined && action.payload.name !== '') {
                state.showAgents = state.agents.filter(x => x.name.toUpperCase().includes((action.payload.name as string).toUpperCase()))
            }
        },
        changeType: (state, action: PayloadAction<AgentType>) => {
            state.agentType = action.payload
        },
        changeName: (state, action: PayloadAction<string>) => {
            state.agentName = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getList.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getList.fulfilled, (state, action) => {
                state.status = 'idle';
                state.agents = action.payload;
                state.agentType = AgentType.All
            }).addCase(updateAgent.fulfilled, (state, action) => {
                state.status = 'idle';
                let agent = state.agents.find(x => x.id === action.payload.id) as AgentModel;
                agent.resources = action.payload.resources
            });
    },
});

export const { changeType, changeName, getShowAgents } = agentSlice.actions;
export const agentData = (state: RootState) => state.agent;

export default agentSlice.reducer;
