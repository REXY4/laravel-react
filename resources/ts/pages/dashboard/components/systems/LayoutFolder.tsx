import React, { useEffect, useRef } from 'react';
import RelationGraph, {
    RGOptions,
    RGJsonData,
    RGNode,
    RGLine,
    RGLink,
    RGUserEvent,
    RelationGraphComponent,
    JsonNode,
} from 'relation-graph-react';

// import './layout-folder.scss';

const LayoutFolder = () => {
    const graphRef = useRef<RelationGraphComponent | null>(null);

    const graphOptions: RGOptions = {
        debug: false,
        layout: {
            layoutName: 'folder',
            from: 'left',
            min_per_width: 50,
            min_per_height: 40,
            centerOffset_x: 80,
            centerOffset_y: -100,
        },
        defaultNodeShape: 1,
        defaultNodeWidth: 100,
        defaultLineShape: 41,
        allowShowMiniToolBar: false,
        defaultPolyLineRadius: 4,
        defaultExpandHolderPosition: 'right',
        defaultBottomJuctionPoint_X: 28,
        defaultJunctionPoint: 'lr',
        defaultNodeBorderWidth: 0,
        defaultLineColor: 'rgba(0, 186, 189, 1)',
        defaultNodeColor: 'rgba(0, 186, 189, 1)',
        reLayoutWhenExpandedOrCollapsed: true,
        canvasZoom: 190,
        minCanvasZoom: 190,
        disableZoom: true,
        isMoveByParentNode: false,
        disableDragCanvas: true,
        disableDragNode: false,
        zoomToFitWhenRefresh: true,
    };
    const setGraphData = async () => {
        const rootNodeJson: JsonNode[] = [
            {
                fontColor: 'black',
                id: 'a',
                text: 'Systems',
                children: [
                    {
                        fontColor: 'black',
                        id: 'b',
                        text: 'Menu Item',
                        children: [
                            {
                                fontColor: 'black',
                                id: 'b1',
                                text: 'b1',
                                children: [
                                    {
                                        id: 'b1-1',
                                        fontColor: 'black',
                                        text: 'Menu',
                                    },
                                ],
                            },
                            {
                                id: 'b2',
                                text: 'b2',
                                children: [
                                    { id: 'b2-1', text: 'b2-1' },
                                    { id: 'b2-2', text: 'b2-2' },
                                ],
                            },
                        ],
                    },
                    {
                        id: 'c',
                        text: 'c',
                        children: [
                            { id: 'c1', text: 'c1' },
                            { id: 'c2', text: 'c2' },
                            { id: 'c3', text: 'c3' },
                        ],
                    },
                ],
            },
        ];

        const graphInstance = graphRef.current!.getInstance();
        const graphJsonData: RGJsonData = {
            rootId: 'a',
            nodes: [],
            lines: [],
        };

        graphInstance?.flatNodeData(
            rootNodeJson,
            null,
            graphJsonData.nodes,
            graphJsonData.lines
        );

        graphJsonData.lines.forEach((line) => {
            line.fromJunctionPoint = 'bottom';
            line.toJunctionPoint = 'left';
        });

        // console.log('graphJsonData:', graphJsonData);

        await graphInstance.addNodes(graphJsonData.nodes);
        await graphInstance.addLines(graphJsonData.lines);
        graphInstance.graphData.rootNode = graphInstance?.getNodeById(
            graphJsonData.rootId!
        );
        await graphInstance?.doLayout();
        await graphInstance?.playShowEffect();
    };
    useEffect(() => {
        setGraphData();
    }, []);

    return (
        <div style={{ height: 'calc(100vh)', width: '100%' }}>
            <RelationGraph ref={graphRef} options={graphOptions} />
        </div>
    );
};

export default LayoutFolder;
