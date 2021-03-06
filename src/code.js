// This function replaces the officiall function fillData() on the MotoGP website
// This an initial proof of concept

// Replace the header of the live timing widget with the following HTML:
/*
<tr>
    <th class="th_40">POS</th>
    <th class="th_40">#</th>
    <th class="th_rider_name">RIDER</th>
    <th class="th_40">Fastest</th>
    <th class="th_40">Lap</th>
    <th class="gap">GAP</th>
    <th class="th_40">Last lap</th>
    <th class="th_40">Pit</th>
</tr>
*/




function fillData(e) {
    var t, a = (void 0 !== e.event_bar && void 0 !== e.event_bar.tkid ? e.event_bar.tkid : e.lt.head.circuit_id,
    void 0 !== e.lt.head.calendar_event_track ? e.lt.head.calendar_event_track : ""), n = void 0 !== e.event_bar && void 0 !== e.event_bar.category ? e.event_bar.category : e.lt.head.category, s = null !== e.lt ? e.lt.head.session_name : "", i = null !== e.lt ? e.lt.head.session_status_name.toLowerCase() : "", d = null !== e.lt ? Number(e.lt.head.session_type) : "", r = null !== e.lt && "f" != i, o = void 0 !== e.event_bar && void 0 !== e.event_bar.shortname ? e.event_bar.shortname : e.lt.head.event_shortname, l = void 0 !== e.event_bar && void 0 !== e.event_bar.event_name ? e.event_bar.event_name : e.lt.head.event_tv_name, c = void 0 !== e.event_bar && void 0 !== e.event_bar.test_results_url ? e.event_bar.test_results_url : e.lt.head.url, v = void 0 !== e.event_bar && void 0 !== e.event_bar.current_session ? e.event_bar.current_session : e.lt.head.session_name, h = void 0 !== e.event_bar && void 0 !== e.event_bar.next_session ? e.event_bar.next_session : e.lt.head.session_name, m = null !== e.lt ? e.lt.head.circuit_name : e.event_bar.circuit_name, u = e.lt.head.remaining, _ = get_lt_link(i, c, trid), f = e.lt.head.url, g = !1;
    $(".link.fullLT").attr("href", _),
    r ? ($(".testTop .lt").removeClass("hidden"),
    $(".testTop .pre").addClass("hidden"),
    $("body").hasClass("mobile") ? ($(".testTop .lt .touch").removeClass("hidden"),
    $(".testTop .lt .desktop").addClass("hidden")) : ($(".testTop .lt .touch").addClass("hidden"),
    $(".testTop .lt .desktop").removeClass("hidden"))) : ($(".testTop .pre").removeClass("hidden"),
    $(".testTop .lt").addClass("hidden")),
    t = checkSessionMode(v, h, u, i);
    try {
        $(".location .flag").addClass("flag flags_44x28-" + o.toLowerCase())
    } catch (b) {}
    switch ($(".eventName a").html(l),
    $(".eventName a").attr("href", f),
    $(".location .circuit").html(m),
    "c" != i && "f" != i ? $(".catses").html(n + " " + s) : $(".catses").html(e.lt.head.category + " " + e.lt.head.session_name),
    "LiveMode" == t ? ($(".currentEvt").removeClass("hidden"),
    $(".nextEvt").addClass("hidden"),
    $(".sessionFlag").removeClass("hidden"),
    $(".link.fullLT").removeClass("hidden")) : "EntryMode" == t ? ($(".currentEvt").addClass("hidden"),
    $(".nextEvt").removeClass("hidden"),
    $(".sessionFlag").addClass("hidden"),
    $(".link.fullLT").removeClass("hidden"),
    changeFlag("")) : "CircuitMode" == t && ($(".nextEvt").removeClass("hidden"),
    $(".currentEvt").addClass("hidden"),
    $(".sessionFlag").addClass("hidden"),
    $(".link.fullLT").addClass("hidden")),
    $(".secondary").addClass("hidden"),
    "LiveMode" == t ? "64" == d && "f" != i ? $(".secondary.liveRace").removeClass("hidden") : "64" != d && "f" != i ? $(".secondary.liveNoRace").removeClass("hidden") : "f" == i && ($(".secondary.finalized").removeClass("hidden"),
    $(".currentEvt").addClass("hidden"),
    $(".nextEvt").addClass("hidden")) : $(".secondary.nextEvent").removeClass("hidden"),
    "CircuitMode" == t ? ($(".livetiming .riders").addClass("hidden"),
    $(".livetiming .track").removeClass("hidden"),
    $(".livetiming .track img").attr("src", a)) : ($(".livetiming .riders").removeClass("hidden"),
    $(".livetiming .track").addClass("hidden")),
    d) {
    case 64:
        g = !1;
        break;
    default:
        g = !0,
        acumulated_remaining = u
    }
    var C;
    if (!0 === g && "n" != i) {
        switch ($(".remaining").countdown({
            until: acumulated_remaining,
            onExpiry: function() {},
            format: "HMS",
            layout: "{hnn}:{mnn}:{snn}"
        }),
        "i" == i && $(".remaining").countdown("pause"),
        "s" != i && "r" != i || $(".remaining").countdown("resume"),
        "f" == i || "i" == i ? number_of_refresh = 0 : number_of_refresh++,
        i) {
        case "s":
        case "r":
            C = "green";
            break;
        case "i":
            C = "red";
            break;
        case "f":
        case "c":
            C = "finish";
            break;
        default:
            C = ""
        }
        changeFlag(C)
    } else
        "n" != i ? $(".remaining").html(u) : $(".remaining").html("");
    if (e.lt) {
        var p = 0;
        for (var b in e.lt.rider)
            p++;
        void 0;
        var y, k, w;
        isComponent ? w = Math.min(p, riders_to_show) : (riders_to_show = 16,
        w = Math.max(p, riders_to_show));
        var T = $('.timing_table[data-trsid ="' + trid + '"]');
        $(".rider", T).remove(),
        $.each(e.lt.rider, function(e, t) {
            if (Number(e) <= w && (k = t.pos,
            y = 1 == Number(e) || "0" == k || "-1" == k ? t.lap_time : "+" + t.gap_first,
            "0" != k && "-1" != k || (k = t.status_name),
            $("tbody", T).append(
                '<tr class="rider rider_' + e + '" ' + (t.rider_number=='88'?'style="background-color: coral"':'') +
                '><td class="bold pos position"><div>' + k + 
                '</div></td><td class="dorsal"><div>' + t.rider_number + 
                '</div></td><td class="bold"><div>' + t.rider_name.substr(0, 1) + ". " + t.rider_surname + 
                '</div></td><td class="gap"><div>' + t.lap_time +
                '</div></td><td class="gap"><div>' + t.num_lap + '/' + t.last_lap +
                '</div></td><td class="gap"><div>' + y +
                '</div></td><td class="gap"><div>' + t.last_lap_time +
                '</div></td><td class="gap"><div>' + t.on_pit +
                "</div></td></tr>")),
            "f" != i) {
                var a = .1 * e * 1e3;
                $(" .rider_" + e, T).css({
                    opacity: 0
                }).animate({
                    opacity: 1
                }, a)
            } else
                $(" .rider_" + e, T).css({
                    opacity: 1
                })
        }),
        isComponent && window.packContent && window.packContent.motogpPackery("layout")
    }
}
