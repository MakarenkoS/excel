import { $ } from "../../../core/dom"



export function resizeHandler($root, event) {

    console.log('Start resizing', event.target)
    const $resizer = $(event.target)
    // $parent = $resizer.$el.parentNode // Плохо т.к. верстка может поменяться
    // $parent = $resizer.$el.closest('.column') // Класс тоже может поменяться
    const $parent = $resizer.closest('[data-type = "resizable"]')
    const coords = $parent.getCoords()
    const type = $resizer.data.resize
    const sideProp = type === 'col' ? 'bottom' : 'right'
    let value

    $resizer.css({
        opacity: 1,
        [sideProp]: '-5000px'
    })

    document.onmousemove = e => {
        if (type === 'col') {
            const delta = e.pageX - coords.right
            value = coords.width + delta;
            $resizer.css({ right: -delta + 'px' })
            // $parent.css({
            //     width: value + 'px',
            // })
            // // $parent.$el.style.width = value + 'px';
            // // cells.forEach(el => el.style.width = value + 'px')
            // cells.forEach(el => $(el).css({
            //     width: value + 'px',
            //     backgroundColor: 'lightgreen'
            // }))
        } else {
            const delta = e.pageY - coords.bottom
            value = coords.height + delta;
            $resizer.css({ bottom: -delta + 'px' })

        }

    }


    document.onmouseup = e => {
        document.onmousemove = null
        document.onmouseup = null

        if (type === 'col') {
            $parent.css({
                width: value + 'px',
            })
            $root.findAll(`[data-col ="${$parent.$el.dataset.col}"]`)
                .forEach(el => $(el).css({
                    width: value + 'px',
                }))
        } else {
            $parent.css({
                height: value + 'px',
            })
        }

        $resizer.css({
            opacity: 0,
            bottom: 0,
            right: 0
        })

    }
}

